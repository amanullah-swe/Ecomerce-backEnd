import express, { Router } from 'express';
import { deleteCartItem, readCartItem, updateCartItem, createCartItem, readAllCartItemsByUseraId, } from '../controller/cart.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminRoleMiddleware } from '../middleware/adminRoleMiddleware.js';
const router = Router();

/*ROUTING */
// get products by user id
router.get("/user", authMiddleware, readAllCartItemsByUseraId);


// Create a new product.
router.post("/", authMiddleware, createCartItem);


// Get a single product by its ID.
router.get("/:id", authMiddleware, readCartItem);



// Update a product.
router.patch("/:id", authMiddleware, updateCartItem);

// Delete a product
router.delete("/:id", authMiddleware, deleteCartItem);




export default router;