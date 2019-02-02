import express from 'express';
import { clientController } from '../controllers';

const router = express.Router();
router.route('/:client')
    .get(clientController.getClientInfo)
    
router.route('/:client/:licensePlate')
    .post(clientController.postInvoice)
    .get(clientController.getInvoice);

export const client = { router, path: '/' };