import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getAllFeedPosts,
  getUserPosts,
  likePost,
} from '../controllers/post.js';

const router = express.Router();

/* READ */
router.get('/feed', verifyToken, getAllFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

/* UPDATE */
router.get('/:id/like', verifyToken, likePost);

export default router;
