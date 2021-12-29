const express = require("express")
const axios = require("axios")
const qs = require("qs")
const router = express.Router()
const registry = require("./registry.json")


router.all("/:apiName/*", async (req, res) => {
    console.log(req.params.apiName);
    var path = req.url.replace('/' + req.params.apiName, '')
    var urll = registry.services[req.params.apiName].url + path
    console.log(path);
    console.log(urll);
    console.log(req.body);
    if (registry.services[req.params.apiName]) {
        console.log("SENT");
        const json = JSON.stringify(req.body);
        console.log(json);
        await axios({
            method: req.method,
            url: urll,
            headers: req.headers,
            mode: 'cors',
            data: req.body
        }).then(response => {
            console.log("RECIEVED");
            res.send(response.data)
        }).catch((e) => {
            console.log(e);
        })
    } else {
        res.send("API doesn't exist")
    }
})
module.exports = router