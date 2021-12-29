import booksController from '../controllers/booksController';
var booksRouter = require("express").Router();

// Get all books
booksRouter.get("/all", booksController.findAllBooks);

//Search
booksRouter.get("/search_book", booksController.search);

//Add book
booksRouter.post("/add", booksController.addBook);

//Get by id
booksRouter.get("/:id", booksController.findBookById);

// //Get by name
// booksRouter.get("/:titre", booksController.findBookByName);

//Delete book
booksRouter.delete("/:id", booksController.deleteBookById);

//Update book
booksRouter.put("/:id", booksController.UpdateBookById);


export default booksRouter;