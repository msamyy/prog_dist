const db = require("../models");
const Book = db.book;
const Op = db.Sequelize.Op;

const findAllBooks = (req, res) => {
    Book.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving books."
            });
        });
};

const findBookById = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Book.findAll({
            where: {
                bookID: +req.params.id,
            },
        });
        if (data.length === 0) {
            res.status(404).send({
                error: 'not_found',
                message: `Ce livre ${+req.params.id} n'existe pas : `,
                status: 404,
            });
        } else {
            res.send(data);
        }
    }
    catch (err) {
        res.status(500).send({
            message: "Error retrieving book with id=" + id
        });
    };
}


const findBookByName = async (req, res) => {
    const title = req.params.title;
    try {
        const data = await Book.findAll({
            where: {
                bookID: +req.params.title,
            },
        });
        if (data.length === 0) {
            res.status(404).send({
                error: 'not_found',
                message: `Ce livre ${+req.params.title} n'existe pas : `,
                status: 404,
            });
        } else {
            res.send(data);
        }
    }
    catch (err) {
        res.status(500).send({
            message: "Error retrieving book with name=" + title
        });
    };
}


const search = async (req, res) => {
    try {
        let text = req.query.text;
        let data = await Book.findAll({
            where: {
                title: {
                    [Op.like]: "%" + text + "%"
                }
            }
        });
        return res.json({
            status: "ok",
            books: data
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            books: error
        })
    }
}

const addBook = async (req, res) => {
    // Validate request
    const neededKeys = ['title', 'isbn'];
    if (!(neededKeys.every(key => Object.keys(req.body).includes(key)))) {
        res.status(400).send({
            success: false,
            message: "manque d'infos!"
        });
        return;
    }
    try {
        let book = req.body;
        Book.create(book)
            .then(data => {
                res.status(200).send({
                    success: true,
                    msg: 'Le livre est enregistré.',
                    book: data,
                });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the book."
                });
            });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occured while searching livre "
        });
    }
};

const deleteBookById = async (req, res) => {
    const id = req.params.id;
    Book.destroy({ where: { bookID: id } }).
        then((data) => {
            res.status(200).json({
                message: "Book deleted successfully",
                book: data
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Error deleting book with id=" + id
            });
        });
}

function UpdateBookById(req, res) {
    let updateBook = req.body;
    Book.update(updateBook, { where: { bookID: req.params.id } }).
        then((data) => {
            res.status(200).json({
                message: "Book updated successfully",
                book: data
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Error updating book with id=" + id
            });
        });
}







export default {
    findAllBooks,
    findBookById,
    findBookByName,
    search,
    addBook,
    deleteBookById,
    UpdateBookById
};