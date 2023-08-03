import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

/**
 * Friend component displays a friend's information and allows the user to add or remove the friend.
 *
 * @param {string} friendId - The ID of the friend.
 * @param {string} name - The name of the friend.
 * @param {string} subtitle - The subtitle of the friend.
 * @param {string} userPicturePath - The path to the friend's profile picture.
 *
 * @returns {JSX.Element} - The rendered Friend component.
 */
const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // React Router navigate function
  const { _id } = useSelector((state) => state.user); // The ID of the logged-in user from Redux state
  const token = useSelector((state) => state.token); // The authentication token from Redux state
  const friends = useSelector((state) => state.user.friends); // The list of friends of the logged-in user from Redux state

  const { palette } = useTheme(); // Material-UI theme object
  const primaryLight = palette.primary.light; // The light shade of the primary color from the theme
  const primaryDark = palette.primary.dark; // The dark shade of the primary color from the theme
  const main = palette.neutral.main; // The main shade of the neutral color from the theme
  const medium = palette.neutral.medium; // The medium shade of the neutral color from the theme

  const isFriend = friends.find((friend) => friend._id === friendId); // Check if the friend is already in the user's friend list

  /**
   * Patch the friend's information in the database.
   *
   * @returns {Promise<void>} - A promise that resolves when the friend's information is successfully patched.
   */
  const patchFriend = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "https://linksbynk.com"}/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data })); // Update the friend list in Redux state
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />{" "}
        {/* Display the friend's profile picture */}
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`); // Navigate to the friend's profile page
            navigate(0); // Scroll to the top of the page
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light, // Change the text color on hover to the light shade of the primary color
                cursor: "pointer",
              },
            }}
          >
            {name} {/* Display the friend's name */}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle} {/* Display the friend's subtitle */}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()} // Call the patchFriend function when the button is clicked
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} /> // Display the remove friend icon if the friend is already in the user's friend list
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} /> // Display the add friend icon if the friend is not in the user's friend list
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
