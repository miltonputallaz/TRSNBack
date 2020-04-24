var pgp = require("pg-promise")(/*options*/);
const username = "postgres";
const password = "1234";
const host = "localhost"
const port = 5432;
const database = "therealsocialnetwork"
var db = pgp("postgres://"+username+":"+password+"@"+host+":"+port+"/"+database);


module.exports = db