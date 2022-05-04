const User = require ('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signin = async (req, res, next) => {
    console.log(req.body)
    console.log(req.body.email)
    console.log(req.body.password)
    bcrypt.hash( req.body.password , 10)
    .then( hash => {
         User.create({
             'email': req.body.email,
             'password':hash
         })
         .then(() => {
             console.log(User);
             //res.send(User)
             res.sendStatus(200);
         })
         .catch(error => {
             console.log(error);
             res.status(400).json({ error })
         });
     })
};
let idUser;
exports.login = async (req, res, next) => {
    console.log(res.body)
        User.findOne({ where: {email: req.body.email} })
        .then(User => {
          console.log(User.password);
            idUser = User.id;
            let status = User.status;
            console.log(idUser)
            if (!User) {
              return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, User.password)
            .then(() => {
              console.log(res);
              if (bcrypt.compare(req.body.password, User.password)===false) {
                return res.status(401).json({ error: "erreur d'authentification" });
              }
              res.status(200).json({
                  status : User.status,
                  token: jwt.sign(
                    { userId: User.id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                  )
              });
              console.log(idUser);
              })
            .catch(error =>{
              console.log(error)
              res.status(500).json({ error })
          })
          .catch(error => res.status(500).json({ error }));
        })
};