import express from 'express';
import { parkingController } from '../controllers';

const router = express.Router();
router.route('/:parking').get(parkingController.getAllParkingLot);
router.route('/:parking/:parkingLot')
    .post(parkingController.postParkingSpot)
    .get(parkingController.getParkingSpot);

export const parking = { router, path: '/' };