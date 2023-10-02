import express, { Router } from 'express';
import { createProduct, deleteProduct, readAllProducts, readAllProductsByFilter, readProduct, updateProduct } from '../controller/product.js';
import { adminRoleMiddleware } from '../middleware/adminRoleMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = Router();

/*ROUTING */
// Get a single product by its ID.
router.get("/:id", readProduct);
// getAllProducts
router.get("/", readAllProductsByFilter);

// Create a new product.
router.post("/", authMiddleware, adminRoleMiddleware, createProduct);

// Update a product.
router.patch("/:id", authMiddleware, adminRoleMiddleware, updateProduct);

// Delete a product.
router.delete("/:id", authMiddleware, adminRoleMiddleware, deleteProduct);




export default router;