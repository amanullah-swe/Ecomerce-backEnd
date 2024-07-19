import express, { Router } from 'express';
import { createProduct, deleteProduct, readAllProducts, readAllProductsByFilter, readProduct, updateProduct } from '../controller/product.js';
import { adminRoleMiddleware } from '../middleware/adminRoleMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multerMidelWare.js';
const router = Router();

const uploadFields = upload.fields([
    { name: 'images', maxCount: 5 }, // Up to 5 files for the 'images' field
    { name: 'thumbnail', maxCount: 1 } // 1 file for the 'thumbnail' field
]);


/*ROUTING */
// Get a single product by its ID.
router.get("/:id", readProduct);
// getAllProducts
router.get("/", readAllProductsByFilter);

// Create a new product.
router.post("/", authMiddleware, adminRoleMiddleware, uploadFields, createProduct);

// Update a product.
router.patch("/:id", authMiddleware, adminRoleMiddleware, uploadFields, updateProduct);

// Delete a product.
router.delete("/:id", authMiddleware, adminRoleMiddleware, deleteProduct);




export default router;