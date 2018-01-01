const db = require('./dbConfig.js');




let model = {

    createRecommendation: function (data, cb) {
        let recommendation = new db(data);

        recommendation.save((err, fluffy) => {
            if (err) {
                return cb(err);
            }
            cb(null,recommendation.getRecord());
            
        });

    },
    getRecommendation:function(cb){
        db.find({},null,{sort:{_id:-1}},(err,resp)=>{
            return cb(err,resp);
        });
    },
    deletRecommendation:function(movie,cb){
        db.remove({id:movie.id},(err,resp)=>{
            if (err) {
                return cb(err);
            }
            cb(null,"Deleted successfully");
        });
    }
};

module.exports = model;
// var fluffy = new db({ name: 'fluffy' });


// fluffy.save(function (err, fluffy) {
//   if (err) return console.error(err);
//   console.log("Inserted");
//   //fluffy.speak();
// });
