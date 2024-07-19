import express, { Router } from 'express';
import { login, logout, register } from '../controller/auth.js';
import { upload } from '../middleware/multerMidelWare.js';
const router = Router();

/*ROUTING */
// register user
router.post("/register", upload.single("profileImage"), register);
// login user
router.post("/login", login);

router.post("/logout", logout);






export default router;