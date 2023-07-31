/**
 * This code imports the 'express' module from the 'express' package.
 * It also imports the 'login' function from the '../controllers/auth.js' file.
 * 
 * It then creates a new instance of the 'express.Router()' class and assigns it to the 'router' variable.
 * 
 * Finally, it defines a POST route '/login' on the 'router' instance and assigns the 'login' function as the route handler.
 * 
 * The 'router' instance is exported as the default value of this module.
 */
import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);

export default router;

