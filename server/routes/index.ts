import express from 'express';

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('layout.njk', { serviceName: 'Check local air quality' });
  //res.render('index2', { title: 'World' });
});

export default router;
