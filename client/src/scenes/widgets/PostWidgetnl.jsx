import {
  Box,
  Typography,
  Link,
  useTheme,
} from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";

const PostWidgetnl = ({
  postId,
  name, // name of the user who posted
  description,
  userPicturePath, // user's profile picture
  picturePath, // post's thumbnail
  createdAt,
  url,
}) => {
  const date = new Date(createdAt);
  const formattedTime = date.toLocaleString();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  
  const imageUrl = `${
    process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "https://linksbynk.com"
  }/assets/${userPicturePath}`;
  

  return (
    <WidgetWrapper m="2rem 0">
      {/* User's name and profile picture */}
      <Box sx={{ display: "flex", alignItems: "center", mb: "1rem" }}>
        <img
          alt="user profile thumbnail"
          src={imageUrl}
          style={{ width: "40px", borderRadius: "20px" }}
        />
        <Typography variant="h6" sx={{ ml: "0.5rem" }}>
          {name}
        </Typography>
      </Box>
      <Link
        href={url}
        underline="none"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            border: "1px solid grey",
            borderRadius: "0.75rem",
            padding: "1rem",
            mt: "0.75rem",
            "& img": {
              width: "25%",
              objectFit: "cover",
              maxHeight: "150px",
            },
          }}
        >
          <img
            alt="post thumbnail"
            src={`${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "https://linksbynk.com"}/assets/${picturePath}`}
          />
          <Box>
            <Typography variant="subtitle1">
              <a href={url}>{url}</a>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              GPT GENERATED SUMMARY OR DESCRIPTION TO GO HERE, source website
              provides some description, can be used and modified for paywall
              related articles
            </Typography>
          </Box>
        </Box>
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
      </Link>
      <Box mt="0.25rem">
        <Link underline="always" color="text.secondary" component="span">
          {formattedTime}
        </Link>
      </Box>
    </WidgetWrapper>
  );
};

export default PostWidgetnl;
