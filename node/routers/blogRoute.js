import express from 'express';
import upload from '../middleware/multerConfig.js';

import { createBlog, deleteBlog, getBlogs, getSingleBlog, updateBlog } from '../controllers/blogController.js';

const router = express.Router();

router.post('/blog',upload.single('blog_img'), createBlog);
router.get('/blog', getBlogs);
router.get('/blog/:id', getSingleBlog);
router.put('/blog/:id', upload.single('blog_img'),updateBlog);
router.delete('/blog/:id', deleteBlog);

export default router;