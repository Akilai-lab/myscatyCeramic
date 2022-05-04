const User = require ('./../models/user');
const Confirm = require ('./../models/confirmation');
const Article = require ('./../models/article');
const Order = require('./../models/ordered');

const jwt = require('jsonwebtoken');

exports.getAllOrders = async (req, res, next) => {
    Confirm.findAll()
    .then(confirm => {
        console.log(confirm)
        res.send(confirm)
    })
    .catch(error => {
        console.log(error)
        res.status(400).json({ error })
    })
}
exports.deleteAnOrder = async (req, res, next) => {
    console.log(req.body.order)
   var mail = req.body.order[0].mailUser;
   console.log(mail)
   User.findOne({
       where : {
           email: mail
       }
   })
   .then(user => {
       console.log(user.id)
       Confirm.findOne({
           where : {
               userId : user.id
           }
       })
       .then(response => {
           console.log(response.dataValues)
            console.log(JSON.parse(response.dataValues.articles))
            Order.findAll({
                where: {
                    userId : user.id
                }
            })
            .then(order => {
                var idArticlesList = [];
                var idNewArticlesList = [];
                var idSpecific;
                var ssObect;
                for (var key in order) {
                    if (order.hasOwnProperty(key))
                        {
                            var dataArticle = order[key].dataValues;
                            idArticlesList.push({
                                'id':dataArticle.idArticle,
                                'ssArticle':dataArticle.articles
                            })
                        }
                }
                idArticlesList.forEach(scndElement => {
                    idSpecific = JSON.parse(scndElement.id)[0]
                    if (typeof(JSON.parse(scndElement.id)[0]) === 'object') {
                        idSpecific = JSON.parse(scndElement.id)[0][0]
                    }
                   Article.findAll({
                       where : {
                           'id' : idSpecific
                       }
                   })
                   .then(article => {
                       for (var key in article) {
                        if (article.hasOwnProperty(key))
                            {
                                var dataNewArticle = article[key].dataValues;
                                console.log('1')
                                ssObect = JSON.parse(JSON.parse(scndElement.ssArticle))
                                console.log(ssObect)
                                console.log('ssObject')
                                if(ssObect === JSON.parse(dataNewArticle.firstObject)) {
                                    console.log(JSON.parse(dataNewArticle.firstObject)) 
                                    console.log(ssObect)
                                }
                                if(ssObect === JSON.parse(dataNewArticle.scndObject)) {
                                    console.log(JSON.parse(dataNewArticle.scndObject)) 
                                    console.log(ssObect)
                                }
                                if(ssObect === JSON.parse(dataNewArticle.thirdObject)) {
                                    console.log(JSON.parse(dataNewArticle.thirdObject)) 
                                    console.log(ssObect)
                                }
                            }
                    }
                    console.log('2')
                   })
                   .catch(err => console.log(err))
                });
            })
       })
       .catch(err => console.log(err))
   })
   .catch(err => console.log(err))
}