const express = require('express')
const router = express.Router()
const axios = require('axios')

router.post('/', async (req, res) => {
    try {
        const urll = 'http://localhost:9000/adminapi/auth/admin';
        data = { email: req.body.email, mdp: req.body.password }
        const rest = await axios.post(urll, data);
        if (rest.status === 200) {
            console.log(rest.data.accessToken);
            res.cookie("accessToken", rest.data.accessToken);
            res.redirect("books/recent")
        } else {
            res.render('index', { error: rest.body.msg })
        }
    } catch (e) {
        res.render('index', { layout: false, error: e.response.data.msg })
    }
})


module.exports = router