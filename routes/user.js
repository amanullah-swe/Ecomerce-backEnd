import express, { Router } from 'express';
import { deleteUser, readUser, updateUser } from '../controller/user.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = Router();

/*ROUTING */
// readUser.
router.get("/", authMiddleware, readUser);

// Update a user.
router.patch("/:id", authMiddleware, updateUser);

// Delete a delete.
router.delete("/:id", authMiddleware, deleteUser);




export default router;