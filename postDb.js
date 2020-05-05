var db = require("./database")
module.exports = {

    addPost (requestBody) {
        var query ;
        if (requestBody.imageurl == undefined){
            query =  'INSERT INTO post(title,description, timestamp) VALUES ($1, $2, NOW())';
        } else {
            query=   'INSERT INTO post(title, description, timestamp, imageurl) VALUES ($1, $2, NOW(), $3)';
        }
        return db.query(query,[requestBody.title, requestBody.description,requestBody.imageurl])
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("error");
        })
    },

    getAll (offset,userid) {
        const query = 'select tableall.ident as id,tableall.title,tableall.description,tableall.imageurl,tableall.likedcount,CASE WHEN tableall.likeid is null THEN FALSE ELSE TRUE END AS favourite FROM (select * from (SELECT ident,title,description,imageurl,likedcount,timestamp FROM post ORDER BY timestamp ASC LIMIT 10 OFFSET $1) as postq left join (select ident as likeid, userid, postid from likes where userid = $2) as likesq on postq.ident = likesq.postid) as tableall order by timestamp desc';
        return db.many(query,[offset,userid])
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return null;
        })
    }
}

