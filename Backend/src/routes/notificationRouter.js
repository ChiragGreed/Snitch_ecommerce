import express from 'express';
import { createSubscription } from '../controllers/restockSubscriptionController.js';


const notificationRouter = express.Router();

notificationRouter.post('/restock/subscribe', createSubscription);

export default notificationRouter;