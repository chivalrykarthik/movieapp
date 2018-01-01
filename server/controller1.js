///import { request } from 'https';
//import { error } from 'selenium-webdriver';

//8f5ecc67d725eda11fb8ef6bf236586d
const request = require('request'),
    baseURL = "https://api.themoviedb.org/3/movie/",
    baseURLSearch = "https://api.themoviedb.org/3/search/movie/",
    apiKey = "api_key=8f5ecc67d725eda11fb8ef6bf236586d",
    path = {
        "join":"?",
        "upComing": "upcoming?",
        "popularMovies": "popular?"
    };    

var controller = {
    getDashboardData: function (cb) {

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
            self.getPopularMovies(onGettingMovies);

        }
        self.getUpcoming(onGettingData);
    },
    getUpcoming: function getUpcoming(cb) {
        console.log("URL=" + baseURL + path.upComing + apiKey);
        request.get(baseURL + path.upComing + apiKey, (err, resp, body) => {
            if (err || (resp && resp.statusCode !== 200)) {
                let errMsg = "Cannot get response from api";
                if (resp && resp.body && resp.body.status_message) {
                    errMsg = resp.body.status_message;
                }
                return cb(errMsg);
            }
            return cb(null, body);

        });

    },
    getPopularMovies: function getPopularMovies(cb) {
        console.log("URL=" + baseURL + path.popularMovies + apiKey);
        request.get(baseURL + path.popularMovies + apiKey, (err, resp, body) => {
            if (err || (resp && resp.statusCode !== 200)) {
                let errMsg = "Cannot get response from api";
                if (resp && resp.body && resp.body.status_message) {
                    errMsg = resp.body.status_message;
                }
                return cb(errMsg);
            }
            return cb(null, body);

        });

    },
    searchMovies: function searchMovies(key, cb) {
        console.log("URL="+baseURLSearch+path.join+apiKey+"&query="+key);
        //return cb(baseURLSearch+path.join+apiKey+"&query="+key);
        request.get(baseURLSearch+path.join+apiKey+"&query="+key, (err, resp, body) => {
            if (err || (resp && resp.statusCode !== 200)) {
                let errMsg = "Cannot get response from api";
                if (resp && resp.body && resp.body.status_message) {
                    errMsg = resp.body.status_message;
                }
                return cb(errMsg);
            }
            return cb(null, body);

        });
    }
};

module.exports = controller;


//https://api.themoviedb.org/3/movie/upcoming?api_key=8f5ecc67d725eda11fb8ef6bf236586d&language=en-US&page=1
//https://api.themoviedb.org/3/movie/597,27205/recommendations?api_key=8f5ecc67d725eda11fb8ef6bf236586d&language=en-US&page=1