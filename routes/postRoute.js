const postDb = require("../postDb");
var router = require('express').Router(); 
// individual products routes
router.post('/add', function(req, res, next) { 
    console.log(req.headers);
    postDb.addPost(req.body)
    .then(
        res.status(200).json({
            "joyita":"perro"
        })
    )
});

router.get('/all', function(req,res,next){
    console.log(req.headers);
    postDb.getAll(req.header('firebasetoken'))
    .then( (response) => {
        res.send(response)
    }
    )
    .catch(

    )
});

router.post('/addtofavourite', function(req,res,next){
    console.log(req.headers);
    postDb.addToFavourite(req.header('firebasetoken'),req.body.id)
    .then( (response) => {
        res.send(response);
        }
    )
    .catch(
     
    )
}
);

router.post('/removefromfavourites', function(req,res,next){
    console.log(req.headers);
    postDb.removeFromFavourite(req.header('firebasetoken'),req.body.id)
    .then( (response) => {
        res.send(response)
        }
    )
    .catch(

    )
});

module.exports = router;