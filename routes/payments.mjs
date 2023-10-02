import express, { Router } from "express";

import pkg from '../controller/payments.cjs';
const { stripeCheckout, stripeWebHook } = pkg;
import { checkOrderPrice } from "../middleware/checkOrderPrice.js";

const router = Router();

router.post('/create-checkout-session', express.json(), checkOrderPrice, stripeCheckout)
router.post('/stripe_webhooks', express.raw({ type: 'application/json' }), stripeWebHook);


export default router;