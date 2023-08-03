import { Box } from "@mui/material";
import Navbar from "scenes/navbar";
import PostsWidget from "scenes/widgets/PostsWidget";

/**
 * The ViewPage component represents a page focused on displaying posts.
 * It's optimized for mobile view and centers the posts on the page.
 *
 * @returns {JSX.Element} The rendered ViewPage component
 */
const ViewPage = () => {
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
        display="flex"
        flexDirection="column"
        alignItems="center" // Centering content
        justifyContent="center" // Centering content
        >
        {/* Posts widget component */}
        <PostsWidget />
      </Box>
    </Box>
  );
};

export default ViewPage;
