CREATE TABLE "koalas"
("id" SERIAL PRIMARY KEY NOT NULL ,
"name" VARCHAR(20) NOT NULL,
"favorite_color" VARCHAR(20) NOT NULL,
"age" INTEGER NOT NULL,
"ready_to_transfer" BOOLEAN DEFAULT FALSE NOT NULL,
"notes" VARCHAR(256)
);

INSERT INTO "koalas"
    ("name", "favorite_color", "age", "ready_to_transfer", "notes")
VALUES
    ('Scotty', 'Red', 4, 'true', 'Born in Guatemala'),
    ('Jean', 'Green', 5, 'true', 'Allergic to lots of lava'),
    ('Ororo', 'Yellow', 7, 'false', 'Loves listening to Paula (Abdul)'),
    ('K''Leaf', 'Purple', 15, 'false', 'Never refuses a treat.'),
    ('Charlie', 'Orange', 9, 'true', 'Favorite band is Nirvana'),
    ('Betsy', 'Blue', 4, 'true', 'Has a pet iguana');
    
   SELECT * FROM "koalas";