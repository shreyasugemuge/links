import Post from "../models/Post.js";
import User from "../models/User.js";
import puppeteer from 'puppeteer';
import multer from 'multer';

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets');
  },
  filename: (req, file, cb) => {  
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

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
    const { userId, url, description, picturePath } = req.body;
    const user = await User.findById(userId);

    if (!picturePath) {
      // Launch a new browser instance
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      // Define a path to save the screenshot
      thumbnailPath = `thumbnails/${new Date().getTime()}.png`;
      // Take a screenshot
      const screenshotBuffer = await page.screenshot();
      // Close the browser
      await browser.close();

      // Use Multer to save the screenshot
      const thumbnailFilename = new Date().getTime() + '-thumbnail.png';
      const thumbnailPath = 'uploads/' + thumbnailFilename;
      require('fs').writeFileSync(thumbnailPath, screenshotBuffer);

      picturePath = thumbnailPath;
    }

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
