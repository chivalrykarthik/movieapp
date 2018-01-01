const routes = require('express').Router();
const appController = require('./route-controller.js');

routes.get('/welcome', (req, res) => {
  res.send({ msg: 'Welcome to movie app' });
});

routes.get('/dashboard', (req, res) => {
  appController.getDashboardData((err, resp) => {
    res.send({ err: err, resp: resp });
  });
});

routes.get('/search/:key', (req, res) => {
  appController.searchMovies(req.params.key, (err, resp) => {
    res.send({ err: err, resp: resp });
  });
});



routes.post('/recommendation', (req, res) => {
  appController.createRecommendation(req, (err, resp) => {
    res.send({ err: err, resp: resp });
  });
}).get('/recommendation', (req, res) => {
  appController.getRecommendation((err, resp) => {
    res.send({ err: err, resp: resp });
  });
}).delete('/recommendation', (req, res) => {
  appController.deleteRecommendation(req, (err, resp) => {
    res.send({ err: err, resp: resp });
  });
  //res.send({ err: null, resp: req.body });
  //res.send({ err: err, resp: resp });
});

module.exports = routes;