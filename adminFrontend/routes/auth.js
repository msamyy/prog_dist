const express = require('express')
const router = express.Router()
const axios = require('axios')

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

router.post('/', async (req, res) => {
    try {
        const urll = 'http://localhost:6000/adminAPI/adminapi/auth/admin';
        data = { email: req.body.email, mdp: req.body.password }
        console.log(data);
        const rest = await axios.post(urll, data);
        //   localStorage.setItem('accessToken', rest.data.accessToken);
        //   console.log(localStorage.getItem('accessToken'));
        if (rest.status === 200) {
            // let books
            // try {
            //     // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoyLCJlbWFpbCI6ImNhY2EiLCJoYXNoZWRwd2QiOiIkMmIkMTAkRnNWN0VzdlB0TUpINjhXODBlQUtSLjRCdDdEZkU0ZnJCVU1SaGpCWWRhWjBKeFQ3L0VPNnkiLCJpYXQiOjE2NDA1Mjc0NDUsImV4cCI6MTY3MjA2MzQ0NX0.DkrijX-tOaIi1zy1DMEJUZIC0NJbMhdfO3dokSQhB9I';
            //     // console.log(token);
            //     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoyLCJlbWFpbCI6ImNhY2EiLCJoYXNoZWRwd2QiOiIkMmIkMTAkRnNWN0VzdlB0TUpINjhXODBlQUtSLjRCdDdEZkU0ZnJCVU1SaGpCWWRhWjBKeFQ3L0VPNnkiLCJpYXQiOjE2NDA1Mjc0NDUsImV4cCI6MTY3MjA2MzQ0NX0.DkrijX-tOaIi1zy1DMEJUZIC0NJbMhdfO3dokSQhB9I';
            //     const headerss =
            //     {
            //         'authorization': 'Bearer ' + token
            //     };
            //     const urll = 'http://localhost:6000/adminAPI/adminapi/books/all';
            //     let rslt = await axios.get(urll, { headers: headerss });
            //     books = rslt.data;
            //     books = books.sort(GetSortOrder("publication_date"));
            //     books = books.slice(0, 22);
            // } catch {
            //     books = []
            // }
            // res.render('partials/recent', { books: books })
            res.redirect("books/recent")
        } else {
            res.render('index', { error: rest.body.msg })
        }
    } catch (e) {
        res.render('index', { layout: false, error: e.response.data.msg })
    }
})


module.exports = router