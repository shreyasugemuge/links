/**
 * This code imports the mongoose library for interacting with MongoDB.
 * It defines a UserSchema using the mongoose.Schema constructor.
 * The UserSchema defines the structure and validation rules for the User model.
 * The User model represents a user in the application.
 * The UserSchema has the following fields:
 * - firstName: a required string with a minimum length of 2 and a maximum length of 50.
 * - lastName: a required string with a minimum length of 2 and a maximum length of 50.
 * - email: a required string with a maximum length of 50 and must be unique.
 * - password: a required string with a minimum length of 5.
 * - picturePath: a string with a default value of an empty string.
 * - friends: an array with a default value of an empty array.
 * - location: a string.
 * - occupation: a string.
 * - viewedProfile: a number.
 * - impressions: a number.
 * The UserSchema also includes timestamps for createdAt and updatedAt fields.
 * The User model is created using the UserSchema and exported as the default export.
 */
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;


