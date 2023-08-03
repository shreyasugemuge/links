import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

/**
 * ProfilePage component displays the profile page of a user.
 * It fetches user data from the server using the userId parameter and token.
 * It renders the user's profile information, friend list, and posts.
 *
 * @returns {JSX.Element} The rendered profile page.
 */
const ProfilePage = () => {
  // State variables
  const [user, setUser] = useState(null);

  // Get userId from URL parameters
  const { userId } = useParams();

  // Get token from Redux store
  const token = useSelector((state) => state.token);

  // Check if the screen is non-mobile
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  /**
   * Fetches user data from the server and sets the user state.
   */
  const getUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "https://linksbynk.com"}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  // Fetch user data on component mount
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // If user data is not available, return null
  if (!user) return null;

  // Render the profile page
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
