const postDb = require("../postDb");
var router = require('express').Router(); 


router.post('/add', function(req,res,next){
    console.log(req.headers);
    postDb.addPost(req.body)
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

router.get('/all', function(req,res,next){
    console.log(req.headers);
    console.log("OFFSET"+req.query.offset);
    postDb.getAll(req.query.offset, req.header('firebasetoken'))
    .then( (response) => {
        res.send(response);
    }
    )
    .catch(

    )
});



module.exports = router;