const express = require('express')
const axios = require('axios')
const router = express.Router()
const Book = require('../models/book')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']


function GetSortOrder(prop) {
  return function (a, b) {
      if (a[prop] < b[prop]) {
          return 1;
      } else if (a[prop] > b[prop]) {
          return -1;
      }
      return 0;
  }
}

// All Books Route
router.get('/', async (req, res) => {
  let books
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoyLCJlbWFpbCI6ImNhY2EiLCJoYXNoZWRwd2QiOiIkMmIkMTAkRnNWN0VzdlB0TUpINjhXODBlQUtSLjRCdDdEZkU0ZnJCVU1SaGpCWWRhWjBKeFQ3L0VPNnkiLCJpYXQiOjE2NDA1Mjc0NDUsImV4cCI6MTY3MjA2MzQ0NX0.DkrijX-tOaIi1zy1DMEJUZIC0NJbMhdfO3dokSQhB9I';
    const headerss =
    {
      'authorization': 'Bearer ' + token
    };
    let urll
    if (req.query.title != null) {
      urll = 'http://localhost:6000/adminAPI/adminapi/books/search_book?text=' + req.query.title;
    } else {
      urll = 'http://localhost:6000/adminAPI/adminapi/books/all';
    }
    let rslt = await axios.get(urll, { headers: headerss });
    books = rslt.data;
    res.render('books/index', {
      books: books,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

router.get('/recent', async (req, res) => {
  let books
  try {
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoyLCJlbWFpbCI6ImNhY2EiLCJoYXNoZWRwd2QiOiIkMmIkMTAkRnNWN0VzdlB0TUpINjhXODBlQUtSLjRCdDdEZkU0ZnJCVU1SaGpCWWRhWjBKeFQ3L0VPNnkiLCJpYXQiOjE2NDA1Mjc0NDUsImV4cCI6MTY3MjA2MzQ0NX0.DkrijX-tOaIi1zy1DMEJUZIC0NJbMhdfO3dokSQhB9I';
    // console.log(token);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoyLCJlbWFpbCI6ImNhY2EiLCJoYXNoZWRwd2QiOiIkMmIkMTAkRnNWN0VzdlB0TUpINjhXODBlQUtSLjRCdDdEZkU0ZnJCVU1SaGpCWWRhWjBKeFQ3L0VPNnkiLCJpYXQiOjE2NDA1Mjc0NDUsImV4cCI6MTY3MjA2MzQ0NX0.DkrijX-tOaIi1zy1DMEJUZIC0NJbMhdfO3dokSQhB9I';
    const headerss =
    {
      'authorization': 'Bearer ' + token
    };
    const urll = 'http://localhost:6000/adminAPI/adminapi/books/all';
    let rslt = await axios.get(urll, { headers: headerss });
    books = rslt.data;
    books = books.sort(GetSortOrder("publication_date"));
    books = books.slice(0, 22);
  } catch {
    books = []
  }
  res.render('partials/recent', { books: books })
})


// New Book Route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Book())
})

// Create Book Route
router.post('/', async (req, res) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoyLCJlbWFpbCI6ImNhY2EiLCJoYXNoZWRwd2QiOiIkMmIkMTAkRnNWN0VzdlB0TUpINjhXODBlQUtSLjRCdDdEZkU0ZnJCVU1SaGpCWWRhWjBKeFQ3L0VPNnkiLCJpYXQiOjE2NDA1Mjc0NDUsImV4cCI6MTY3MjA2MzQ0NX0.DkrijX-tOaIi1zy1DMEJUZIC0NJbMhdfO3dokSQhB9I';
    // console.log(token);
    const urll = 'http://localhost:6000/adminAPI/adminapi/books/add';
    const headerss =
    {
      'authorization': 'Bearer ' + token
    };
    const rslt = await axios.post(urll, req.body, { headers: headerss });
    console.log(rslt);
  try {

    res.redirect(`books/${rslt.data.book.bookID}`)
  } catch {
    renderNewPage(res, null, true)
  }
})

// Show Book Route
router.get('/:id', async (req, res) => {
  try {
    // const book = await Book.findById(req.params.id)
    //                        .populate('author')
    //                        .exec()
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoyLCJlbWFpbCI6ImNhY2EiLCJoYXNoZWRwd2QiOiIkMmIkMTAkRnNWN0VzdlB0TUpINjhXODBlQUtSLjRCdDdEZkU0ZnJCVU1SaGpCWWRhWjBKeFQ3L0VPNnkiLCJpYXQiOjE2NDA1Mjc0NDUsImV4cCI6MTY3MjA2MzQ0NX0.DkrijX-tOaIi1zy1DMEJUZIC0NJbMhdfO3dokSQhB9I';
    // console.log(token);
    const urll = 'http://localhost:6000/adminAPI/adminapi/books/' + req.params.id;
    const headerss =
    {
      'authorization': 'Bearer ' + token
    };
    const rslt = await axios.get(urll, { headers: headerss });
    const book = rslt.data[0]
    res.render('books/show', { book: book })
  } catch {
    res.redirect('/')
  }
})

// Edit Book Route
router.get('/:id/edit', async (req, res) => {
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoyLCJlbWFpbCI6ImNhY2EiLCJoYXNoZWRwd2QiOiIkMmIkMTAkRnNWN0VzdlB0TUpINjhXODBlQUtSLjRCdDdEZkU0ZnJCVU1SaGpCWWRhWjBKeFQ3L0VPNnkiLCJpYXQiOjE2NDA1Mjc0NDUsImV4cCI6MTY3MjA2MzQ0NX0.DkrijX-tOaIi1zy1DMEJUZIC0NJbMhdfO3dokSQhB9I';
    // console.log(token);
    const urll = 'http://localhost:6000/adminAPI/adminapi/books/' + req.params.id;
    const headerss =
    {
      'authorization': 'Bearer ' + token
    };
    const rslt = await axios.get(urll, { headers: headerss });
    const book = rslt.data[0]
    renderEditPage(res, book)
  } catch {
    res.redirect('/')
  }
})

// Update Book Route
router.put('/:id', async (req, res) => {
  let book
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoyLCJlbWFpbCI6ImNhY2EiLCJoYXNoZWRwd2QiOiIkMmIkMTAkRnNWN0VzdlB0TUpINjhXODBlQUtSLjRCdDdEZkU0ZnJCVU1SaGpCWWRhWjBKeFQ3L0VPNnkiLCJpYXQiOjE2NDA1Mjc0NDUsImV4cCI6MTY3MjA2MzQ0NX0.DkrijX-tOaIi1zy1DMEJUZIC0NJbMhdfO3dokSQhB9I';
    // console.log(token);
    const urll = 'http://localhost:6000/adminAPI/adminapi/books/' + req.params.id;
    const headerss =
    {
      'authorization': 'Bearer ' + token
    };
    const rest = await axios.put(urll, req.body, { headers: headerss });
    book = rest.data.book;
    console.log(rest);
    if (rest.status === 200) {
      res.redirect(`${req.params.id}`)
    } else {
      renderEditPage(res, book, true)
    }
  } catch {
    if (book != null) {
      renderEditPage(res, book, true)
    } else {
      redirect('/')
    }
  }
})

// Delete Book Page
router.delete('/:id', async (req, res) => {
  let book
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoyLCJlbWFpbCI6ImNhY2EiLCJoYXNoZWRwd2QiOiIkMmIkMTAkRnNWN0VzdlB0TUpINjhXODBlQUtSLjRCdDdEZkU0ZnJCVU1SaGpCWWRhWjBKeFQ3L0VPNnkiLCJpYXQiOjE2NDA1Mjc0NDUsImV4cCI6MTY3MjA2MzQ0NX0.DkrijX-tOaIi1zy1DMEJUZIC0NJbMhdfO3dokSQhB9I';
    const urll = 'http://localhost:6000/adminAPI/adminapi/books/' + req.params.id;
    const headerss =
    {
      'authorization': 'Bearer ' + token
    };
    console.log("deleting", req.params.id);
    const rest = await axios.delete(urll, { headers: headerss });
    if (rest.status === 200) {
      console.log("deleted");
      res.redirect('/books')
    }
  } catch {
    res.render('books/show', {
      book: book,
      errorMessage: 'Could not remove book'
    })
  }
})

async function renderNewPage(res, book, hasError = false) {
    renderFormPage(res, book, 'new', hasError)
  }

async function renderEditPage(res, book, hasError = false) {
    renderFormPage(res, book, 'edit', hasError)
  }

async function renderFormPage(res, book, form, hasError = false) {
    try {
      const params = {
        book: book
      }
      if (hasError) {
        if (form === 'edit') {
          params.errorMessage = 'Error Updating Book'
        } else {
          params.errorMessage = 'Error Creating Book'
        }
      }
      res.render(`books/${form}`, params)
    } catch {
      res.redirect('/books')
    }
  }

function saveCover(book, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
      book.coverImage = new Buffer.from(cover.data, 'base64')
      book.coverImageType = cover.type
    }
  }

module.exports = router