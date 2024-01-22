import express from 'express';
import feedbackController from '../controllers/page-content-controller';
var router = express.Router();

/* GET home page. */
router.get('/', feedbackController.feedback);

export default router;
