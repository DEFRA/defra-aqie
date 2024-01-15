import express from 'express';
var router = express.Router();
import locationController from '../controllers/location-controller';

router.get('/', locationController.getLocationDetails);

export default router;
