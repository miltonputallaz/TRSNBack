
const favouriteDb = require("../favouriteDb");
var router = require('express').Router(); 

router.post('/add', function(req,res,next){
    console.log(req.headers);
    favouriteDb.addToFavourite(req.header('firebasetoken'),req.body.id)
    .then( (response) => {
        res.status(200).send({
            "code":"200"
        });
        }
    )
    .catch(
     
    )
}
);

router.post('/remove', function(req,res,next){
    console.log(req.headers);
    favouriteDb.removeFromFavourite(req.header('firebasetoken'),req.body.id)
    .then( (response) => {
        res.status(200).send({
            "code":"200"
        });
        }
    )
    .catch(

    )
});

module.exports = router;