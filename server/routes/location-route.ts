import express from 'express';
var router = express.Router();
import locationController from '../controllers/location-controller';

router.post('/', locationController.getLocationData);

export default router;
