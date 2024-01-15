import express from 'express';
var router = express.Router();
import pollutantController from '../controllers/pollutants-controller';

router.get('/', pollutantController.particulateMatter10);

export default router;
