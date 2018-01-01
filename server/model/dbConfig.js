const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://localhost/movieDB', { useMongoClient: true });


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('openUri', function () {
    console.log("Successfully established DB connection");
});






let schema = mongoose.Schema(
    {
        "id": "string",
        "poster_path": "string",
        "title": "string",
        "overview": "string",
        "vote_average": "string",
    }
);

schema.methods.getRecord = function () {
    return this;
};
let model = mongoose.model("movieRecommedations", schema);
module.exports = model;