import express, { Router } from 'express';
import { createCatogry, deleteCatogry, readAllCatogries, readCatogry, updateCatogry } from '../controller/catogry.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminRoleMiddleware } from '../middleware/adminRoleMiddleware.js';
const router = Router();

/*ROUTING */
// Get a single Brand by its ID.
router.get("/:id", authMiddleware, readCatogry);
// getAllBrands
router.get("/", readAllCatogries);

// Create a new Brand.
router.post("/", authMiddleware, adminRoleMiddleware, createCatogry);

// Update a Brand.
router.patch("/:id", authMiddleware, adminRoleMiddleware, updateCatogry);

// Delete a Brand.
router.delete("/:id", authMiddleware, adminRoleMiddleware, deleteCatogry);




export default router;