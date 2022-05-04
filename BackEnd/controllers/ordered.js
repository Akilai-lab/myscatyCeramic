const Order = require('./../models/ordered');
const Commande = require('./../models/confirmation');
const User = require('./../models/user')
const jwt = require('jsonwebtoken');

exports.getActualOrder = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    Order.findAll({ where: {userId: userId} })
    .then(order => {
      res.send(order);
    })
    .catch(error =>{
        console.log(error)
        res.status(500).json({ error })
    })
}
//getAllOrder
exports.getAllOrder = async (req, res, next) => {
  Order.findAll()
  .then(order => {
    res.send(order);
  })
  .catch(error =>{
      console.log(error)
      res.status(500).json({ error })
  })
}
//deleteCommande
exports.deleteCommande = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId;
  console.log(req.body)
Order.findOne({ where: {
  id: req.body.donnees.id,
  userId : userId} })
  .then(order => {
    order.destroy();
  })
  .catch(error =>{
      console.log(error)
      res.status(500).json({ error })
  })
}
//CheckOrder
exports.CheckOrder = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId;
  Order.findOne({where:{id:req.body[0].id}})
    .then(order=> {
      User.findOne({ where: {id: order.userId} 
      })
      .then(user => {
       var mail = user.email
       console.log(mail)
       const SaveCommande = [];
       req.body.forEach(element => {
         var arrayCommande = {
           'details': element.details,
           'image' : element.image,
           'id': element.id,
           'mailUser' : mail 
         }
         SaveCommande.push(arrayCommande)
         console.log(SaveCommande)
       });
       console.log('test')
       console.log(SaveCommande)
        Commande.create({ 
         'articles': JSON.stringify(SaveCommande),
         'userId': userId
         })
         .then(confirm => {
            console.log(userId);
            res.send(confirm);
         })
         .catch(error => {
             console.log(error);
             res.status(400).json({ error })
         });
      })
      .catch(error =>{
        console.log(error)
        res.status(500).json({ error })
      })
    })
    .catch(error => res.status(500).json({ error }));
}