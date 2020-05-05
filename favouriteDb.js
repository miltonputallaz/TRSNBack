
var db = require("./database")

module.exports = {
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