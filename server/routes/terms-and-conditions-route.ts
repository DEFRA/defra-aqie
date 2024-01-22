import express from 'express';
import termsAndConditionsController from '../controllers/footer-controller';
var router = express.Router();

/* GET home page. */
router.get('/', termsAndConditionsController.termsAndConditions);

export default router;
