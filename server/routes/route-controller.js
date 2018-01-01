const request = require('request');
//const async = require('async');
const routeconst = require('./route-constants');
const model = require('./../model/model.js');
var routeController = {};
var errAPI = 'Cannot get response from api';
var errKeyword = 'Results not found for the keyword';

routeController.searchMovies = function (reqQuery, cb) {
    let formatUrl = routeconst.baseUrlSearch + '?' + routeconst.api_Key + "&query=" + reqQuery;
    //console.log("searchURL="+formatUrl);
    request.get(formatUrl, (err, resp, body) => {
        let tmpR = JSON.parse(body);
        if (err || (resp && resp.statusCode !== 200)) {
            let errMsg = errAPI;
            if (resp && resp.body && resp.body.status_message) {
                errMsg = resp.body.status_message;
            }
            return cb(errMsg);
        } else if (tmpR && tmpR.results && tmpR.results.length) {
            return cb(null, body);
        } else {
            let errMsg = errKeyword;
            return cb(errMsg);
        }
    });
};

routeController.getUpcoming = function (cb) {
    let formatUrl = routeconst.baseUrl + routeconst.upcoming + '?' + routeconst.api_Key;
    //console.log("upcomingURL=" + formatUrl);
    request.get(formatUrl, (err, resp, body) => {
        if (err || (resp && resp.statusCode !== 200)) {
            let errMsg = errAPI;
            if (resp && resp.body && resp.body.status_message) {
                errMsg = resp.body.status_message;
            }
            return cb(errMsg);
        }
        return cb(null, body);

    });
};

routeController.getPopularMovies = function (cb) {
    let formatUrl = routeconst.baseUrl + routeconst.popular + '?' + routeconst.api_Key;
    //console.log("popularURL=" + formatUrl);
    request.get(formatUrl, (err, resp, body) => {
        if (err || (resp && resp.statusCode !== 200)) {
            let errMsg = errAPI;
            if (resp && resp.body && resp.body.status_message) {
                errMsg = resp.body.status_message;
            }
            return cb(errMsg);
        }
        return cb(null, body);

    });
};

routeController.getDashboardData = function (cb) {
    //console.log("Inside - getDashboardData");
    var self = this, onGettingData = function onGettingData(err, upcomingMovies) {
        if (err) {
            return cb(err);
        }
        var onGettingMovies = function (err, popularMovies) {
            if (err) {
                return cb(err);
            }
            var respObj = { popularMovies: popularMovies, upcomingMovies: upcomingMovies };
            return cb(null, respObj);
        };
        routeController.getPopularMovies(onGettingMovies);
    }
    routeController.getUpcoming(onGettingData);
};


routeController.createRecommendation = function (req, cb) {
   
    model.createRecommendation(req.body, cb);

};


routeController.getRecommendation = function (cb) {    
    model.getRecommendation(cb);
};


routeController.deleteRecommendation = function (req,cb) {    
    model.deletRecommendation(req.body,cb);
};
module.exports = routeController;