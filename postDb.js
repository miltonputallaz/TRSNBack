var db = require("./database")
module.exports = {

    addPost (requestBody) {
        var query ;
        if (requestBody.imageUrl == undefined){
            query =  'INSERT INTO post(title,description, timestamp) VALUES ($1, $2, NOW())';
        } else {
            query=   'INSERT INTO post(title, description, timestamp, imageurl) VALUES ($1, $2, NOW(), $3)';
        }
        return db.query(query,[requestBody.title, requestBody.description,requestBody.imageUrl])
        .then((response) => {
            console.log("correcto");
        })
        .catch((error) => {
            console.log("error");
        })
    },

    getAll (userid) {
        const query = 'select tableall.ident as id,tableall.title,tableall.description,tableall.imageurl,tableall.likedcount,CASE WHEN tableall.likeid is null THEN FALSE ELSE TRUE END AS favourite FROM (select * from (SELECT ident,title,description,imageurl,likedcount,timestamp FROM post ORDER BY timestamp ASC LIMIT 10 OFFSET 0) as postq left join (select ident as likeid, userid, postid from likes where userid = $1) as likesq on postq.ident = likesq.postid) as tableall order by timestamp desc';
        return db.many(query,[userid])
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return null;
        })
    },

    addToFavourite (userid, postid) {
        const query = 'INSERT INTO likes(userid, postid) VALUES ($1, $2)';
        const secondquery='UPDATE post SET likedcount = likedcount+1 WHERE ident = $1';
        return Promise.all([db.query(query,[userid,postid]),db.query(secondquery,[postid])])
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return null;
        })
    },

    removeFromFavourite (userid, postid) {
        const query = 'DELETE FROM likes WHERE (userid = $1 AND postid = $2)';
        const secondquery='UPDATE post SET likedcount = likedcount-1 WHERE ident = $1';
        return Promise.all([db.query(query,[userid,postid]),db.query(secondquery,[postid])])
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return null;
        })
    }
}

