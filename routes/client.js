import express from 'express';
import { clientController } from '../controllers';

const router = express.Router();
router.route('/:licensePlate')
    .get(clientController.getClientInfo)
    .get(clientController.getAllInvoices);
    
router.route('/:licensePlate/:invoices')
    .post(clientController.postInvoice)
    .get(clientController.getInvoice);

export const client = { router, path: '/' };