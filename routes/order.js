import express, { Router } from 'express';
import { createOrder, deleteOrder, readAllOrders, readAllOrdersByUserId, readAllOrdersByfilter, readOrderByOrderId, updateOrder, } from '../controller/order.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminRoleMiddleware } from '../middleware/adminRoleMiddleware.js';
const router = Router();


// Route to create a new order
router.post("/", authMiddleware, createOrder);

// Route to fetch all orders
router.get("/", authMiddleware, adminRoleMiddleware, readAllOrdersByfilter);

// Route to fetch all orders by user ID
router.get('/user', authMiddleware, readAllOrdersByUserId);

// Route to fetch an order by order ID
router.get('/:orderId', authMiddleware, readOrderByOrderId);

// Route to update an order by order ID
router.patch('/:orderId', authMiddleware, adminRoleMiddleware, updateOrder);

// Route to delete an order by order ID
router.delete('/:orderId', authMiddleware, adminRoleMiddleware, deleteOrder);

// Export the router
export default router;