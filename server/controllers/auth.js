/**
 * This code imports the bcrypt library for password hashing,
 * the jwt library for generating JSON Web Tokens,
 * and the User model from the "../models/User.js" file.
 *
 * The register function is an asynchronous function that handles user registration.
 * It takes in a request object (req) and a response object (res).
 *
 * Inside the function, it extracts the necessary user information from the request body.
 * It then generates a salt using bcrypt and hashes the password using the generated salt.
 *
 * A new User object is created with the hashed password and other user information.
 * The new user is saved to the database and the saved user is returned as a JSON response.
 *
 * If an error occurs during the registration process, a 500 status code is returned
 * along with an error message in JSON format.
 *
 * The login function is an asynchronous function that handles user login.
 * It takes in a request object (req) and a response object (res).
 *
 * Inside the function, it extracts the email and password from the request body.
 * It then searches for a user with the provided email in the database.
 * If no user is found, a 400 status code is returned with a "User does not exist" message.
 *
 * If a user is found, the provided password is compared with the hashed password stored in the database.
 * If the passwords match, a JSON Web Token (JWT) is generated using the user's ID and a secret key.
 * The user's password is then deleted from the user object before sending the response.
 *
 * If the passwords do not match, a 400 status code is returned with an "Invalid credentials" message.
 *
 * If an error occurs during the login process, a 500 status code is returned
 * along with an error message in JSON format.
 */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Registers a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The saved user object.
 * @throws {Object} - The error object if an error occurs.
 */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Logs in a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The token and user object.
 * @throws {Object} - The error object if an error occurs.
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
