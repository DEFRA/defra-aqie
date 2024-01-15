import express from 'express';
import homeController from '../controllers/home-controller';
var router = express.Router();

/* GET home page. */
router.get('/', homeController.homepage);

export default router;
