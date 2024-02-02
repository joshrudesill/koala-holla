console.log("js");
let data = []; // Original data
let filteredData = []; // filtered data - only use when input has text
let domData = []; // dom data which is whats being rendered - either filtered or not

function getKoalas() {
  console.log("in getKoalas");
  // axios call to server to get koalas
  axios
    .get("/koalas")
    .then((response) => {
      console.log(response.data);
      data = response.data;
      domData = data;
      refreshDOM();
    })
    .catch((err) => console.error(err));
} // end getKoalas
function filtering(event) {
  if (event.target.value !== "") {
    filteredData = data.filter((koala) => {
      if (koala.name.includes(event.target.value)) {
        return true;
      }
      return false;
    });

    domData = filteredData;
  } else {
    domData = data;
  }
  refreshDOM();
}

function refreshDOM() {
  let domNode = document.querySelector("#viewKoalas");
  domNode.innerHTML = "";
  for (const koala of domData) {
    const {
      id,
      name,
      favorite_color: color,
      age,
      ready_to_transfer: rtt,
      notes,
    } = koala;
    domNode.innerHTML += `
    <tr>
      <td>${name}</td>
      <td>${age}</td>
      <td>${color}</td>
      <td>${rtt ? "Y" : "N"}</td>
      <td>${notes}</td>
      ${
        !rtt
          ? `<td><button onclick='markReady(${id})'>Mark Ready</button></td>`
          : `<td><button onclick='markReady(${id})'>Mark UnReady</button></td>`
      }
      
      <td><button onclick='deleteRow(${id})'>Delete</button></td>
    </tr>
    `;
  }
}
function deleteRow(id) {
  Swal.fire({
    title:'Are you sure you want to delete this koala?',
    showDenyButton:true,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: 'No',
}) 
.then((res) => {
  if(res.isConfirmed) {
    axios
    .delete(`/koalas/${id}`)
    .then((result) => {
     getKoalas()
    })
    .catch((err) => console.error(err));
    Swal.fire('Koala was successfully deleted!')
  } else if (res.isDenied) {
    Swal.fire('Koala was not deleted!')
  }
})
}  

function saveKoala(event) {
  event.preventDefault();
  console.log("in saveKoala");
  let name = document.querySelector("#nameIn");
  let favorite_color = document.querySelector("#colorIn");
  let age = document.querySelector("#ageIn");
  let ready_to_transfer = document.querySelector("#readyForTransferIn");
  let notes = document.querySelector("#notesIn");
  let data = {
    name: name.value,
    favorite_color: favorite_color.value,
    age: age.value,
    ready_to_transfer: ready_to_transfer.value,
    notes: notes.value,
  };
  // axios call to server to get koalas
  name.value = "";
  favorite_color.value = "";
  age.value = "";
  ready_to_transfer.value = "";
  notes.value = "";
  data.value = "";
  axios({ method: "POST", url: "/koalas", data: data })
    .then((_) => getKoalas())
    .catch((err) => console.error(err));
}
function markReady(id) {
  axios
    .put(`/koalas/${id}`)
    .then((_) => getKoalas())
    .catch((err) => console.error(err));
}

getKoalas();
