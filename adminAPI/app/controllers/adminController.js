const db = require("../models");
const Admin = db.admin;
const bcrypt = require('bcrypt');


const findAllAdmin = (req, res) => {
    Admin.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

const addAdmin = async (req, res) => {
    // Validate request
    // if (Object.keys(req.body).length < 2) {
    //     res.status(400).send({
    //         success: false,
    //         message: "manque d'infos!"
    //     });
    //     return;
    // }
    const neededKeys = ['email', 'password'];
    if (!(neededKeys.every(key => Object.keys(req.body).includes(key)))) {
        res.status(400).send({
            success: false,
            message: "manque d'infos!"
        });
        return;
    }
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        req.body.hashedpwd = req.body.password;
        delete req.body.password;
        let user = req.body;
        console.log(user);
        Admin.create(user)
            .then(data => {
                res.status(200).send({
                    success: true,
                    msg: 'Le user est enregistré.',
                    user: data,
                });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the user."
                });
            });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occured while searching user "
        });
    }
};

export default {
    findAllAdmin,
    addAdmin
};