import Post from "../models/Post.js";
import User from "../models/User.js";
import axios from 'axios';
import cheerio from 'cheerio';
import download from 'download';
import path from 'path';


const createThumbnailFromUrl = async (url) => {
  // Fetch the HTML from the URL
  const { data } = await axios.get(url);

  // Parse the HTML using Cheerio
  const $ = cheerio.load(data);

  // Get the Open Graph image URL
  const ogImageUrl = $('meta[property="og:image"]').attr('content');

  // Download the image to a temporary path
  const tempImagePath = path.join('public/assets', path.basename(ogImageUrl));
  await download(ogImageUrl, path.dirname(tempImagePath));

  // return path of downloaded image to store in mongo
  return path.basename(tempImagePath);
};



/**
 * Creates a new post.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The created post.
 * @throws {Object} - The error message if the post creation fails.
 */
export const createPost = async (req, res) => {
  try {
    const { userId, url, description } = req.body;
    const user = await User.findById(userId);
    console.log("user", user);

    let picturePath = req.body.picturePath ? req.body.picturePath : await createThumbnailFromUrl(url);
    console.log("picturePath created", picturePath);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      url,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/**
 * Retrieves all posts in the feed.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The retrieved posts.
 * @throws {Object} - The error message if the retrieval fails.
 */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * Retrieves all posts by a specific user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The retrieved posts.
 * @throws {Object} - The error message if the retrieval fails.
 */
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * Likes or unlikes a post.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The updated post.
 * @throws {Object} - The error message if the update fails.
 */
export const likePost = async (req, res) => {
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

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
