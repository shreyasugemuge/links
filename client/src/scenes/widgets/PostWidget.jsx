import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, Link } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  userPicturePath,
  picturePath,
  likes,
  comments,
  createdAt,
  url
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const date = new Date(createdAt);
  const formattedTime = date.toLocaleString();
  console.log(createdAt); // Log the raw value
  console.log(typeof createdAt); // Log the type of the value
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = likes && Boolean(likes[loggedInUserId]);
  const likeCount = likes ? Object.keys(likes).length : 0;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Link href={url} underline="none" target="_blank" rel="noopener noreferrer">
       <Box
  sx={{
    display: "flex",
    gap: "1rem",
    border: "1px solid grey", // border added here
    borderRadius: "0.75rem",
    padding: "1rem",
    mt: "0.75rem",
    '& img': {
      width: "25%",
      objectFit: "cover",
      maxHeight: "150px",
    },
  }}
>
  <img
    alt="post thumbnail"
    src={`http://localhost:3001/assets/${picturePath}`}
  />
  <Box>
    <Typography variant="subtitle1">
      <a href={url}>{url}</a>
    </Typography>
    <Typography variant="body2" color="text.secondary">
      GPT GENERATED SUMMARY OR DESCRIPTION TO GO HERE, source website provides some description, can be used and modified for paywall related articles
    </Typography>
  </Box>
</Box>
<Typography color={main} sx={{ mt: "1rem" }}>
  {description}
</Typography>
      </Link>
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
 
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <Box>
          <Link underline="always" color="text.secondary" component="span">
            {formattedTime}
          </Link>
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </Box>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
