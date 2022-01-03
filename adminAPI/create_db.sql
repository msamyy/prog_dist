CREATE TABLE "book" (
  "bookID" SERIAL primary key,
  "title" TEXT,
  "authors" TEXT,
  "long_description" TEXT,
  "short_description" TEXT,
  "average_rating" real,
  "isbn" varchar(30),
  "num_pages" INTEGER,
  "publication_date" DATE,
  "url" TEXT,
  "quantity" INTEGER,
  "categories" TEXT
);

CREATE TABLE "admin" (
  "adminID" SERIAL primary key,
  "email" varchar(60),
  "hashedpwd" TEXT
);

CREATE TABLE "user" (
  "userID" SERIAL primary key,
  "name" varchar(60),
  "adresse" varchar(60),
  "date_de_naissance" DATE,
  "email" varchar(60),
  "hashedpwd" TEXT,
  "date_adhesion" DATE,
  "avatar_url" TEXT,
  "tel" varchar(15)
);

CREATE TABLE "emprunt" (
  "userID" INTEGER REFERENCES "book",
  "bookID" INTEGER REFERENCES "book",
  "date_retour" DATE,
  primary key ("userID","bookID","date_retour")
);



/*
\copy public."user"("name",email,adresse,tel,date_de_naissance,date_adhesion,avatar_url,hashedpwd) FROM 'C:\Users\MSS\Desktop\M1\prog_dist\projet\prog_dist\adminAPI\usersffff.txt' WITH DELIMITER ',' CSV HEADER;


\copy book(title,isbn,num_pages,publication_date,url,short_description,long_description,authors,categories,average_rating,quantity) FROM 'C:\Users\MSS\Desktop\M1\prog_dist\projet\prog_dist\adminAPI\fixedjson.csv.txt' WITH DELIMITER '|' CSV HEADER;
