CREATE TABLE "book" (
  "bookID" SERIAL primary key,
  "title" TEXT,
  "authors" TEXT,
  "average_rating" real,
  "isbn" varchar(30),
  "isbn13" varchar(30),
  "language_code" varchar(5),
  "num_pages" INTEGER,
  "rating_count" bigint,
  "text_reviews_count" bigint,
  "publication_date" DATE,
  "publisher" TEXT
--   ajouter un champs pour les exemplaires dispos
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
  "tel" varchar(12)
);

CREATE TABLE "emprunt" (
  "userID" INTEGER REFERENCES "book",
  "bookID" INTEGER REFERENCES "book",
  "date_retour" DATE,
  primary key ("userID","bookID","date_retour")
);




