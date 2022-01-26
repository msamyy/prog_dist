const db = require("../models");
const user = db.user;
const Op = db.Sequelize.Op;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function generateAccessToken(usr) {
  // new Date(new Date().getTime()+ 60*60*24*365*1000)
  return jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
}

const loginUser = async (req, res) => {
  if (!req.body.email || !req.body.mdp) {
    res.status(400).send({
      message: "email and pwd can not be empty!"
    });
    return;
  }

  try {
    const usr0 = await user.findOne({
      where: {
        email: req.body.email
      }
    });
    if (usr0) {
      const truth = await bcrypt.compare(req.body.mdp, usr0.hashedpwd);
      if (truth) {
        const accessToken = generateAccessToken(usr0.dataValues);
        res.cookie("accessToken", accessToken, { httpOnly: true });
        res.status(200).send({
          accessToken,
          success: true,
          id: usr0.userID,
          msg: 'L`utilisateur est authentifié.'
        });
      } else {
        res.status(401).send({
          success: false,
          id: -1,
          msg: 'Mot de passe erroné.',
        });
      }
    } else {
      res.status(401).send({
        success: false,
        id: -1,
        msg: 'Compte n\'existe pas !',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while searching User"
    });
  }
};



export default {
  loginUser
}