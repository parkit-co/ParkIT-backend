import express from 'express';
import { parkingController } from '../controllers';

const router = express.Router();
router.route('/').get(parkingController.getAllParkingLot);
router.route('/:parkingLot').get(parkingController.getParkingLotInfo);
router.route('/:parkingLot/:parkingSpot')
    .post(parkingController.postParkingSpot)
    .get(parkingController.getParkingSpot);

export const parking = { router, path: '/parking' };