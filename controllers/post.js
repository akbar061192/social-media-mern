import Post from '../models/Post.js';
import User from '../models/User.js';

/* CREATE POST */
const createPost = async (req, res) => {
  try {
    const { userId, picturePath, description } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      location: user.location,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const allPosts = await Post.find();
    res.status(201).json(allPosts);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getAllFeedPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await Post.find({ userId });
    res.statue(200).json({ userPosts });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const likePost = async () => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatePost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatePost);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export { createPost, getAllFeedPosts, getUserPosts, likePost };
