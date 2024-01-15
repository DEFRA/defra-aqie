import express from 'express';
var router = express.Router();
import pollutantController from '../controllers/pollutants-controller';

router.get('/', pollutantController.particulateMatter2);

export default router;
