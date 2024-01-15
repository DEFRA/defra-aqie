import express from 'express';
var router = express.Router();
import locationController from '../controllers/location-controller';

/* GET users listing. */ //
router.get('/', locationController.searchLocation);

export default router;
