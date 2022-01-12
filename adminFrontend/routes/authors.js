const express = require('express')
const axios = require('axios')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')

// All Authors Route
router.get('/', async (req, res) => {
  let users
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoyLCJlbWFpbCI6ImNhY2EiLCJoYXNoZWRwd2QiOiIkMmIkMTAkRnNWN0VzdlB0TUpINjhXODBlQUtSLjRCdDdEZkU0ZnJCVU1SaGpCWWRhWjBKeFQ3L0VPNnkiLCJpYXQiOjE2NDA1Mjc0NDUsImV4cCI6MTY3MjA2MzQ0NX0.DkrijX-tOaIi1zy1DMEJUZIC0NJbMhdfO3dokSQhB9I';
    const headerss =
    {
      'authorization': 'Bearer ' + token
    };
    let urll
    if (req.query.name != null) {
      urll = 'http://localhost:6000/adminAPI/adminapi/users/search_user?text=' + req.query.name;
    } else {
      urll = 'http://localhost:6000/adminAPI/adminapi/users/all';
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
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoyLCJlbWFpbCI6ImNhY2EiLCJoYXNoZWRwd2QiOiIkMmIkMTAkRnNWN0VzdlB0TUpINjhXODBlQUtSLjRCdDdEZkU0ZnJCVU1SaGpCWWRhWjBKeFQ3L0VPNnkiLCJpYXQiOjE2NDA1Mjc0NDUsImV4cCI6MTY3MjA2MzQ0NX0.DkrijX-tOaIi1zy1DMEJUZIC0NJbMhdfO3dokSQhB9I';
  // console.log(token);
  const urll = 'http://localhost:6000/adminAPI/adminapi/users/add';
  const headerss =
  {
    'authorization': 'Bearer ' + token
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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoyLCJlbWFpbCI6ImNhY2EiLCJoYXNoZWRwd2QiOiIkMmIkMTAkRnNWN0VzdlB0TUpINjhXODBlQUtSLjRCdDdEZkU0ZnJCVU1SaGpCWWRhWjBKeFQ3L0VPNnkiLCJpYXQiOjE2NDA1Mjc0NDUsImV4cCI6MTY3MjA2MzQ0NX0.DkrijX-tOaIi1zy1DMEJUZIC0NJbMhdfO3dokSQhB9I';
    // console.log(token);
    const urll = 'http://localhost:6000/adminAPI/adminapi/users/' + req.params.id;
    const headerss =
    {
      'authorization': 'Bearer ' + token
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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoyLCJlbWFpbCI6ImNhY2EiLCJoYXNoZWRwd2QiOiIkMmIkMTAkRnNWN0VzdlB0TUpINjhXODBlQUtSLjRCdDdEZkU0ZnJCVU1SaGpCWWRhWjBKeFQ3L0VPNnkiLCJpYXQiOjE2NDA1Mjc0NDUsImV4cCI6MTY3MjA2MzQ0NX0.DkrijX-tOaIi1zy1DMEJUZIC0NJbMhdfO3dokSQhB9I';
    // console.log(token);
    const urll = 'http://localhost:6000/adminAPI/adminapi/users/' + req.params.id;
    const headerss =
    {
      'authorization': 'Bearer ' + token
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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoyLCJlbWFpbCI6ImNhY2EiLCJoYXNoZWRwd2QiOiIkMmIkMTAkRnNWN0VzdlB0TUpINjhXODBlQUtSLjRCdDdEZkU0ZnJCVU1SaGpCWWRhWjBKeFQ3L0VPNnkiLCJpYXQiOjE2NDA1Mjc0NDUsImV4cCI6MTY3MjA2MzQ0NX0.DkrijX-tOaIi1zy1DMEJUZIC0NJbMhdfO3dokSQhB9I';
    // console.log(token);
    const urll = 'http://localhost:6000/adminAPI/adminapi/users/' + req.params.id;
    const headerss =
    {
      'authorization': 'Bearer ' + token
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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoyLCJlbWFpbCI6ImNhY2EiLCJoYXNoZWRwd2QiOiIkMmIkMTAkRnNWN0VzdlB0TUpINjhXODBlQUtSLjRCdDdEZkU0ZnJCVU1SaGpCWWRhWjBKeFQ3L0VPNnkiLCJpYXQiOjE2NDA1Mjc0NDUsImV4cCI6MTY3MjA2MzQ0NX0.DkrijX-tOaIi1zy1DMEJUZIC0NJbMhdfO3dokSQhB9I';
    const urll = 'http://localhost:6000/adminAPI/adminapi/users/' + req.params.id;
    const headerss =
    {
      'authorization': 'Bearer ' + token
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