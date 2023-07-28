import { Box, useMediaQuery, Tabs, Tab } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import { useState } from "react";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const [category, setCategory] = useState(0);

  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
  };

  return (
    <Box>
      <Box position="sticky" top={0} zIndex="tooltip">
        <Navbar />
      </Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined} top="10rem">
          <Box mb={isNonMobileScreens ? "2rem" : undefined}>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>
          {isNonMobileScreens && <FriendListWidget userId={_id} />}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "74%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <Tabs value={category} onChange={handleCategoryChange} centered>
            <Tab label="Read" />
            <Tab label="Listen" />
            <Tab label="Watch" />
          </Tabs>
          <PostsWidget userId={_id} category={category} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
