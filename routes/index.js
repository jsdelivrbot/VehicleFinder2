var express = require('express');
var router = express.Router();
var conString = process.env.DATABASE_URL;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
