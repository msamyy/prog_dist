const db = require("../models");
const Admin = db.admin;
const Op = db.Sequelize.Op;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function generateAccessToken(user) {
  // new Date(new Date().getTime()+ 60*60*24*365*1000)
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
}

const authAdmin = async (req, res) => {
  // Validate request
  // console.log("#################################");
  // console.log(req.body.email, req.body.mdp);
  // console.log("#################################");
  if (!req.body.email || !req.body.mdp) {
    res.status(400).send({
      message: "email and pwd can not be empty!"
    });
    return;
  }

  try {
    const adminO = await Admin.findOne({
      where: {
        email: req.body.email
      }
    });
    // mdpHashed = crypto.pbkdf2Sync(req.body.mdp, "mel7", 10, 256, 'sha512').toString();
    if (adminO) {
      const truth = await bcrypt.compare(req.body.mdp, adminO.hashedpwd);
      if (truth) {
        console.log(adminO.dataValues);
        const accessToken = generateAccessToken(adminO.dataValues);
        console.log("#################################");
        console.log(req.body.email, req.body.mdp);
        console.log(adminO.email, adminO.hashedpwd);
        console.log(accessToken);
        console.log("#################################");
        res.cookie("accessToken", accessToken);
        res.status(200).send({
          accessToken,
          success: true,
          id: adminO.adminID,
          msg: 'Admin est authentifié.'
        });
      } else {
        res.status(401).send({
          success: false,
          id: -1,
          msg: 'mot de passe érroné.',
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
      message: err.message || "Some error occured while searching Admin "
    });
  }
};



export default {
  authAdmin
}