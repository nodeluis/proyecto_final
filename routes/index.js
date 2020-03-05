var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var token='';
var id='';
router.get('/home2', function(req, res, next) {
  token=req.query.token;
  id=req.query.id;
  res.redirect('/home');
});
router.get('/home', function(req, res, next) {
  res.render('home.ejs',{token:token,id:id});
});

router.get('/veracruz2', function(req, res, next) {
  res.redirect('/veracruz');
});

router.get('/veracruz', function(req, res, next) {
  res.render('vistas.ejs',{token:'manda'});
});

module.exports = router;
