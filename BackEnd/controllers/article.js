const Article = require ('./../models/article');
const Order = require('./../models/ordered');
const jwt = require('jsonwebtoken');
//addProject
exports.addProject = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    var files = [];
    var fileKeys = Object.keys(req.files);
    let image;
    const firstObject = {
        title : req.body.titleFirst,
        dimension : req.body.dimensionFirst,
        price : req.body.priceFirst,
    } 

    const scndObject = {
        title : req.body.titleScnd,
        dimension : req.body.dimensionScnd,
        price : req.body.priceScnd,
    }

    const thirdObject = {
        title : req.body.titleThird,
        dimension : req.body.dimensionThird,
        price : req.body.priceThird,
    }
    const objectFirst = JSON.stringify(firstObject);
    const objectScnd = JSON.stringify(scndObject);
    const objectThird = JSON.stringify(thirdObject);
    fileKeys.forEach(function(key) {
    files.push(req.files[key]);
    });
    const allImages = [];
    for(let i of files){
        for(let j = 0; j < i.length; j++) {
            console.log(i[j].filename)
            image = `${req.protocol}://${req.get('host')}/images/${i[j].filename}`; 
            allImages.push(JSON.stringify(image))
        }
        console.log(allImages)
    }
        Article.create({ 
            'title': req.body.title,
            'price': req.body.price, 
            'status': 'mis en vente',
            'firstObject': objectFirst,
            'scndObject': objectScnd,
            'thirdObject' : objectThird,
            'img': allImages
            })
            .then(() => {
                console.log(userId);
                res.sendStatus(200);
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({ error })
            });
};
//showAllProject
exports.showAllProject = async (req, res, next) => {
console.log(req.body)

Article.findAll()
    .then(article => {
        console.log(article)
        res.send(article)
    })
    .catch(error => {
        console.log(error)
        res.status(400).json({ error })
    })
};
//descriptOfArticle
exports.descriptOfArticle = async (req, res, next) => {
    console.log(req.query.answer)
    var id = req.query.answer;
    Article.findOne({
        where : {
            id : id
        }
    })
    .then(article => {
        console.log(article)
        res.send(article)
    })
    .catch(error => {
        console.log(error)
        res.status(400).json({ error })
    })
};
exports.addCommande = async (req, res, next) => {
    console.log(req.body)
    console.log(req.body.idArticle)
    console.log(typeof(req.body.idArticle))
    console.log(JSON.parse(req.body.idArticle.length))
    var editArticle;
    editArticle = req.body.idArticle
    console.log(editArticle)
    console.log('test')
    if(req.body.idArticle.length > 2) {
        editArticle = JSON.parse(req.body.idArticle[0])
    }

    console.log('resolution de pb')

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const listArticles = [];
    const listIdArticles = [];
    const pictureArticle= [];
    Article.findOne({
        where: {
            id : editArticle
        }
    })
    .then(article => {
        console.log(article)
        console.log(article.img)
        pictureArticle.push(article.img)
        listIdArticles.push(req.body.idArticle);
        if(req.body.firstObject !== undefined && req.body.scndObject !== undefined){
            console.log('test 2 ajouts')
            listArticles.push(req.body.firstObject)
            Order.create({ 
                'articles': JSON.stringify(listArticles),
                'idArticle' : JSON.stringify(listIdArticles),
                'imgArticle' : JSON.stringify(pictureArticle),
                'userId': userId
                })
                .then(() => {
                    Order.create({ 
                        'articles': JSON.stringify(req.body.scndObject),
                        'idArticle' : JSON.stringify(listIdArticles),
                        'imgArticle' : JSON.stringify(pictureArticle),
                        'userId': userId
                        })
                        .then(order => {
                            console.log(order);
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(400).json({ error })
                        });
                })
                .then(firstOrder => {
                    console.log(firstOrder);
                    res.sendStatus(200);
                })
                .catch(error => {
                    console.log(error);
                    res.status(400).json({ error })
                });
        }
        else if(req.body.firstObject !== undefined && req.body.scndObject === undefined) {
            console.log('test 1er ajouts')
            listArticles.push(req.body.firstObject)
            Order.create({ 
                'articles': JSON.stringify(listArticles),
                'idArticle' : JSON.stringify(listIdArticles),
                'imgArticle' : JSON.stringify(pictureArticle),
                'userId': userId
                })
                .then(() => {
                    console.log(userId);
                    res.sendStatus(200);
                })
                .catch(error => {
                    console.log(error);
                    res.status(400).json({ error })
                });
        }
        else if(req.body.scndObject !== undefined && req.body.firstObject === undefined) {
            console.log('test 2eme ajouts')
            listArticles.push(req.body.scndObject)
            Order.create({ 
                'articles': JSON.stringify(listArticles),
                'idArticle' : JSON.stringify(listIdArticles),
                'imgArticle' : JSON.stringify(pictureArticle),
                'userId': userId
                })
                .then(() => {
                    console.log(userId);
                    res.sendStatus(200);
                })
                .catch(error => {
                    console.log(error);
                    res.status(400).json({ error })
                });
        }
    })
    .catch(err => {
        console.log(err)
    })
};