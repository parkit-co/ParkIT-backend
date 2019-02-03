import express from 'express';
import { clientController } from '../controllers';

const router = express.Router();
router.route('/:licensePlate').get(clientController.getClientInfo);

export const client = { router, path: '/client' };