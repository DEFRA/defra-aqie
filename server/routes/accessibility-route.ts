import express from 'express';
import accessibilityController from '../controllers/footer-controller';
var router = express.Router();

/* GET home page. */
router.get('/', accessibilityController.accessibility);

export default router;
