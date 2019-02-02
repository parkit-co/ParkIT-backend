import express from 'express';
import { parkingController } from '../controllers';

const router = express.Router();
router.route('/:parkingLot').get(parkingController.getAllParkingLot);
router.route('/:parkingLot/:parkingSpot')
    .post(parkingController.postParkingSpot)
    .get(parkingController.getParkingSpot);

export const parking = { router, path: '/' };