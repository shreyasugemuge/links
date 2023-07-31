import { Box } from "@mui/material";

/**
 * UserImage component displays a user's profile image.
 *
 * @param {string} image - The image file name or URL.
 * @param {string} size - The size of the image (default is "60px").
 * @returns {JSX.Element} - The rendered UserImage component.
 */
const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`https://linksbynk.com/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
