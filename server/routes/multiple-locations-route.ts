import express from 'express';
import locationController from '../controllers/location-controller.ts';

var router = express.Router();

/* GET users listing. */ //
router.post('/', locationController.getLocationData);

export default router;
