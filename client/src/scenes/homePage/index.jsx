import { Box, useMediaQuery, Tabs, Tab } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import { useState } from "react";

/**
 * The HomePage component is a functional component that represents the main page of the application.
 * It displays a navigation bar, user information, friend list, user posts, and posts categorized by type.
 *
 * @returns {JSX.Element} The rendered HomePage component
 */
const HomePage = () => {
  // Check if the screen width is greater than or equal to 1000px
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // Get the user's ID and picture path from the Redux store
  const { _id, picturePath } = useSelector((state) => state.user);

  // Set the initial category state to 0
  const [category, setCategory] = useState(0);

  /**
   * Event handler for changing the category value
   *
   * @param {object} event - The event object
   * @param {number} newValue - The new value for the category
   */
  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
  };

  return (
    <Box>
      {/* Sticky navigation bar */}
      <Box position="sticky" top={0} zIndex="tooltip">
        <Navbar />
      </Box>
      {/* Main content */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* User information and friend list */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined} top="10rem">
          <Box mb={isNonMobileScreens ? "2rem" : undefined}>
            {/* User widget component */}
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>
          {/* Friend list widget component (only shown on non-mobile screens) */}
          {isNonMobileScreens && <FriendListWidget userId={_id} />}
        </Box>
        {/* User posts and categorized posts */}
        <Box
          flexBasis={isNonMobileScreens ? "74%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* create post */}
          <MyPostWidget picturePath={picturePath} />
          {/* Tabs for selecting post category */}
          <Tabs value={category} onChange={handleCategoryChange} centered>
            <Tab label="Read" />
            <Tab label="Listen" />
            <Tab label="Watch" />
          </Tabs>
          {/* Posts widget component */}
          <PostsWidget userId={_id} category={category} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
