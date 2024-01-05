import express from 'express';
var router = express.Router();

/* GET users listing. */ //
router.get('/', function (req, res, next) {
  res.render('search-location.njk');
  //res.send('respond with a resource');
});

export default router;
