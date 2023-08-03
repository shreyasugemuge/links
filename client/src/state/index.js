import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for the auth slice of the Redux store.
 * Contains information about the user's authentication status, mode, and posts.
 */
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

/**
 * Redux slice for managing authentication state.
 * Includes reducers for setting the mode, login, logout, friends, posts, and individual posts.
 */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Reducer for setting the mode (light or dark).
     * Toggles the mode between light and dark.
     * @param {Object} state - The current state of the auth slice.
     */
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    /**
     * Reducer for setting the user login information.
     * Sets the user and token in the state.
     * @param {Object} state - The current state of the auth slice.
     * @param {Object} action - The action object containing the user and token payload.
     * @param {Object} action.payload - The payload object containing the user and token.
     * @param {Object} action.payload.user - The user object.
     * @param {string} action.payload.token - The authentication token.
     */
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    /**
     * Reducer for setting the user logout information.
     * Sets the user and token to null in the state.
     * @param {Object} state - The current state of the auth slice.
     */
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    /**
     * Reducer for setting the user's friends.
     * Sets the friends array in the user object.
     * If the user object is null, an error is logged.
     * @param {Object} state - The current state of the auth slice.
     * @param {Object} action - The action object containing the friends payload.
     * @param {Object[]} action.payload.friends - The array of friends.
     */
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },

    /**
     * Reducer for setting the posts.
     * Sets the posts array in the state.
     * @param {Object} state - The current state of the auth slice.
     * @param {Object} action - The action object containing the posts payload.
     * @param {Object[]} action.payload.posts - The array of posts.
     */
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    /**
     * Reducer for setting an individual post.
     * Updates the post with the matching ID in the posts array.
     * @param {Object} state - The current state of the auth slice.
     * @param {Object} action - The action object containing the post payload.
     * @param {Object} action.payload.post - The updated post object.
     */
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
