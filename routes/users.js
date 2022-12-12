import express from 'express';
import {
  getUserInfo,
  getUserFriends,
  addRemoveFriend,
} from '../controllers/user.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/:id', verifyToken, getUserInfo);
router.get('/:id/friends', verifyToken, getUserFriends);

/* UPDATE */
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;
