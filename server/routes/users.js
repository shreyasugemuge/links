import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// read routes
router.get("/:id", verifyToken, getUser); // get user with particular id
router.get("/:id/friends", verifyToken, getUserFriends);

// update routes
router.patch("/:id/:friendID", verifyToken, addRemoveFriend);

export default router;