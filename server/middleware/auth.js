
/**
 * Verifies the token provided in the request header.
 * If the token is valid, sets the verified user in the request object and calls the next middleware.
 * If the token is not provided or is invalid, sends an error response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
import jwt from "jsonwebtoken";

/**
 * Verifies the token provided in the request header.
 * If the token is valid, sets the verified user in the request object and calls the next middleware.
 * If the token is not provided or is invalid, sends an error response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
export const verifyToken = async (req, res, next) => {
  try {
    // Get the token from the request header
    let token = req.header("Authorization");

    // If token is not provided, send an error response
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    // Remove the "Bearer " prefix from the token if present
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Verify the token using the JWT_SECRET
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Set the verified user in the request object
    req.user = verified;

    // Call the next middleware
    next();
  } catch (err) {
    // Send an error response if an error occurs
    res.status(500).json({ error: err.message });
  }
};
