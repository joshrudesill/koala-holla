console.log("js");

function getKoalas() {
  console.log("in getKoalas");
  // axios call to server to get koalas
  axios
    .get("/koalas")
    .then((response) => refreshDOM(response))
    .catch((err) => console.error(err));
} // end getKoalas

function refreshDOM(data) {
  let domNode = document.querySelector("#viewKoalas");
  domNode.innerHTML = "";
  for (const koala of data) {
    const {
      id,
      name,
      favorite_color: color,
      age,
      ready_to_transfer: rtt,
      notes,
    } = koala;
    domNode += `
    <tr>
      <td>${name}</td>
      <td>${age}</td>
      <td>${color}</td>
      <td>${rtt ? "Y" : "N"}</td>
      <td>${notes}</td>
      ${
        !rtt
          ? `<td><button onclick='markReady(${id}}'>Mark Ready</button></td>`
          : ""
      }
      
      <td><button onclick='deleteRow(${id}}'>Delete</button></td>
    </tr>
    `;
  }
}
function deleteRow(id) {
  axios
    .delete(`/koalas/${id}`)
    .then((_) => getKoalas())
    .catch((err) => console.error(err));
}
function saveKoala() {
  console.log("in saveKoala");
  let data = {
    name: document.querySelector("#nameIn"),
    age: document.querySelector("#ageIn"),
    favorite_color: document.querySelector("#colorIn"),
    ready_to_transfer: document.querySelector("#readyForTransferIn"),
    notes: document.querySelector("#notesIn"),
  };
  // axios call to server to get koalas
  axios({ method: "POST", url: "/koalas", data: data })
    .then((_) => getKoalas())
    .catch((err) => console.error(err));
}

getKoalas();
