const express = require('express')
const axios = require('axios')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')

// All Authors Route
router.get('/', async (req, res) => {
  let users
  try {
    const headerss =
    {
      'authorization': 'Bearer ' + req.cookies.accessToken
    };
    let urll
    if (req.query.name != null) {
      urll = 'http://localhost:9000/adminapi/users/search_user?text=' + req.query.name;
    } else {
      urll = 'http://localhost:9000/adminapi/users/all';
    }
    let rslt = await axios.get(urll, { headers: headerss });
    users = rslt.data;
    res.render('authors/index', {
      authors: users,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Author Route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() })
})

// Create Author Route
router.post('/', async (req, res) => {
  const urll = 'http://localhost:9000/adminapi/users/add';
  const headerss =
  {
    'authorization': 'Bearer ' + req.cookies.accessToken
  };
  const rslt = await axios.post(urll, req.body, { headers: headerss });
  console.log(rslt);
  try {

    res.redirect(`authors/${rslt.data.user.userID}`)
  } catch {
    res.render('authors/new', {
      author: req.body,
      errorMessage: 'Error creating user'
    })
  }

})

router.get('/:id', async (req, res) => {
  try {
    const urll = 'http://localhost:9000/adminapi/users/' + req.params.id;
    const headerss =
    {
      'authorization': 'Bearer ' + req.cookies.accessToken
    };
    const rslt = await axios.get(urll, { headers: headerss });
    const user = rslt.data[0]
    res.render('authors/show', { author: user })
  } catch {
    res.redirect('/')
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const urll = 'http://localhost:9000/adminapi/users/' + req.params.id;
    const headerss =
    {
      'authorization': 'Bearer ' + req.cookies.accessToken
    };
    const rslt = await axios.get(urll, { headers: headerss });
    const user = rslt.data[0]
    res.render('authors/edit', { author: user })
  } catch {
    res.redirect('/')
  }
})

router.put('/:id', async (req, res) => {
  let user
  try {
    const urll = 'http://localhost:9000/adminapi/users/' + req.params.id;
    const headerss =
    {
      'authorization': 'Bearer ' + req.cookies.accessToken
    };
    const rest = await axios.put(urll, req.body, { headers: headerss });
    user = rest.data.user;
    console.log(rest);
    if (rest.status === 200) {
      res.redirect(`/authors/${req.params.id}`)
    } else {
      res.render('authors/edit', {
        author: author,
        errorMessage: 'Error updating Author'
      })
    }
  } catch {
    if (user != null) {
      res.render('authors/edit', {
        author: author,
        errorMessage: 'Error updating Author'
      })
    } else {
      redirect('/')
    }
  }

})

router.delete('/:id', async (req, res) => {
  let user
  try {
    const urll = 'http://localhost:9000/adminapi/users/' + req.params.id;
    const headerss =
    {
      'authorization': 'Bearer ' + req.cookies.accessToken
    };
    console.log("deleting", req.params.id);
    const rest = await axios.delete(urll, { headers: headerss });
    if (rest.status === 200) {
      console.log("deleted");
      res.redirect('/authors')
    }
  } catch {
    res.render('authors/edit', {
      author: user,
      errorMessage: 'Error deleting user'
    })
  }
})

module.exports = router