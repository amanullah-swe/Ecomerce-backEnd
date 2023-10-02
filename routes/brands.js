import express, { Router } from 'express';
import { createBrand, deleteBrand, readAllBrands, readBrand, updateBrand } from '../controller/brands.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminRoleMiddleware } from '../middleware/adminRoleMiddleware.js';
const router = Router();

/*ROUTING */
// Get a single Brand by its ID.
router.get("/:id", authMiddleware, readBrand);
// getAllBrands
router.get("/", readAllBrands);

// Create a new Brand.
router.post("/", authMiddleware, adminRoleMiddleware, createBrand);

// Update a Brand.
router.patch("/:id", authMiddleware, adminRoleMiddleware, updateBrand);

// Delete a Brand.
router.delete("/:id", authMiddleware, adminRoleMiddleware, deleteBrand);




export default router;