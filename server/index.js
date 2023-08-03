// Import required modules
import express from "express"; // Import the Express.js framework
import bodyParser from "body-parser"; // Middleware for parsing request bodies
import mongoose from "mongoose"; // MongoDB object modeling tool
import cors from "cors"; // Middleware for enabling Cross-Origin Resource Sharing
import dotenv from "dotenv"; // Module for loading environment variables
import multer from "multer"; // Middleware for handling file uploads
import helmet from "helmet"; // Middleware for securing HTTP headers
import morgan from "morgan"; // Middleware for logging HTTP requests
import path from "path"; // Module for working with file paths
import { fileURLToPath } from "url"; // Module for working with file URLs
import authRoutes from "./routes/auth.js"; // Import routes for authentication
import userRoutes from "./routes/users.js"; // Import routes for user management
import postRoutes from "./routes/posts.js"; // Import routes for posts
import { register } from "./controllers/auth.js"; // Import controller function for user registration
import { createPost } from "./controllers/posts.js"; // Import controller function for creating posts
import { verifyToken } from "./middleware/auth.js"; // Import middleware for verifying JWT tokens
import User from "./models/User.js"; // Import User model
import Post from "./models/Post.js"; // Import Post model

// Define file path variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express.js application
const app = express();

// Set up middleware
app.use(express.json()); // Parse JSON request bodies
app.use(helmet()); // Secure HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Set Cross-Origin Resource Policy
app.use(morgan("common")); // Log HTTP requests
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Parse JSON request bodies with size limit
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Parse URL-encoded request bodies with size limit
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // Serve static files from the "public/assets" directory

/* FILE STORAGE */

// Configure file storage using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets"); // Set destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Set filename for uploaded files
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */

// Define route for user registration with file upload
app.post("/auth/register", upload.single("picture"), register);

// Define route for creating posts with file upload and token verification
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */

// Use authentication routes
app.use("/auth", authRoutes);

// Use user management routes
app.use("/users", userRoutes);

// Use post routes
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */

// Set the port for the server
const PORT = process.env.PORT || 6001;

// Connect to MongoDB using mongoose
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Start the server
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // Insert initial data into the User and Post collections
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));