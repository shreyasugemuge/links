/**
 * This code imports the mongoose library for interacting with MongoDB.
 * It defines a schema for a post object, specifying the data types and required fields.
 * The schema includes fields for userId, firstName, lastName, url, description, picturePath, userPicturePath, likes, and comments.
 * The likes field is defined as a Map with keys of type String and values of type Boolean.
 * The comments field is defined as an Array with a default value of an empty array.
 * The schema also includes a timestamps option, which adds createdAt and updatedAt fields to the document.
 * The Post model is created using the mongoose.model() method, with the schema and a name of "Post".
 * The Post model is then exported as the default export of this module.
 */
import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    url: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;


