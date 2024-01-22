import express from 'express';
import cookiesController from '../controllers/footer-controller';
var router = express.Router();

/* GET home page. */
router.get('/', cookiesController.cookies);

export default router;
