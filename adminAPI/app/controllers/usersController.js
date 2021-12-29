const db = require("../models");
const User = db.user;
const Emprunt = db.emprunt;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

const findAllUser = (req, res) => {
    User.findAll()
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

const findUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await User.findAll({
            where: {
                userID: +req.params.id,
            },
        });
        if (data.length === 0) {
            res.status(404).send({
                error: 'not_found',
                message: `Ce user ${+req.params.id} n'existe pas : `,
                status: 404,
            });
        } else {
            res.send(data);
        }
    }
    catch (err) {
        res.status(500).send({
            message: "Error retrieving user with id=" + id
        });
    };
}

const search = async (req, res) => {
    try {
        let text = req.query.text;
        let data = await User.findAll({
            where: {
                name: {
                    [Op.like]: "%" + text + "%"
                }
                // [Op.or]: [
                //     {
                //         nom: {
                //             [Op.like]: "%" + text + "%"
                //         }
                //     },
                //     {
                //         prenom: {
                //             [Op.like]: "%" + text + "%"
                //         }
                //     }
                // ]
            }
        });
        return res.json({
            status: "ok",
            user: data
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            user: error
        })
    }
}


const getUserEmprunts = async (req, res) => {
    const id = req.params.userID;
    try {
        const data = await Emprunt.findAll({
            where: {
                userID: +req.params.userID,
            },
            include: [{
                model: Book,
                // required: true,
                where: {}
            }]
        });
        console.log(JSON.stringify(data, null, 2));
        if (data.length === 0) {
            res.status(404).send({
                error: 'not_found',
                message: `Ce user ${+req.params.userID} n'a pas d'emprunts : `,
                status: 404,
            });
        } else {
            res.send(data);
        }
    }
    catch (err) {
        res.status(500).send({
            message: "Error retrieving user with id=" + id
        });
    };
}


const addUser = async (req, res) => {
    // Validate request
    // if (Object.keys(req.body).length < 2) {
    //     res.status(400).send({
    //         success: false,
    //         message: "manque d'infos!"
    //     });
    //     return;
    // }
    const neededKeys = ['email', 'name', 'password'];
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
        User.create(user)
            .then(data => {
                res.status(200).send({
                    success: true,
                    msg: 'Le user est enregistré.',
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

const deleteUserById = async (req, res) => {
    const id = req.params.id;
    User.destroy({ where: { userID: id } }).
        then((data) => {
            res.status(200).json({
                message: "User deleted successfully",
                user: data
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Error deleting user with id=" + id
            });
        });
}

function UpdateUserById(req, res) {
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    // var updateUser = {
    //     nom: req.body.nom,
    //     prenom: req.body.prenom,
    //     age: req.body.age,
    //     tel: req.body.tel,
    //     email: req.body.email
    // };
    let updateUser = req.body;
    User.update(updateUser, { where: { userID: req.params.id } }).
        then((data) => {
            res.status(200).json({
                message: "User updated successfully",
                user: data
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
        });
}






export default {
    findAllUser,
    findUserById,
    search,
    getUserEmprunts,
    addUser,
    deleteUserById,
    UpdateUserById
};