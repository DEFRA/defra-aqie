import express from 'express';
import privacyController from '../controllers/footer-controller';
var router = express.Router();

/* GET home page. */
router.get('/', privacyController.privacy);

export default router;
