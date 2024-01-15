import express from 'express';
var router = express.Router();
import pollutantController from '../controllers/pollutants-controller';

router.get('/', pollutantController.ozone);

export default router;
