import express from 'express';
import upload from '../middleware/multerConfig.js';
import { createUser, deleteUser, getSingleUser, getUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/user', upload.single('profile'), createUser);
router.get('/user', getUser);
router.get('/user/:id', getSingleUser);
router.put('/user/:id', upload.single('profile'),updateUser);
router.delete('/user/:id', deleteUser);

export default router;