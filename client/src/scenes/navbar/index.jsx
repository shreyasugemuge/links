import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

/**
 * The Navbar component is a functional component that represents the navigation bar of the application.
 * It displays various elements such as the logo, search bar, user profile, and menu items.
 * The appearance and behavior of the Navbar component depend on the screen size and user interactions.
 *
 * @returns {JSX.Element} The rendered Navbar component
 */
const Navbar = () => {
  // State variables
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  // Redux hooks
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // React Router hook
  const navigate = useNavigate();

  // Material-UI hooks
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // Theme colors
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // Full name of the user
  const fullName = user ? `${user.firstName} ${user.lastName}` : '';

  // Check if the user is logged in
  const isLoggedIn = Boolean(user && user.firstName && user.lastName);

  // Rendered JSX
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        {/* Logo */}
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Links
        </Typography>
        {/* Search bar (visible only on non-mobile screens) */}
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* Desktop navigation */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          {/* Dark mode toggle */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          {/* Message icon */}
          <Message sx={{ fontSize: "25px" }} />
          {/* Notifications icon */}
          <Notifications sx={{ fontSize: "25px" }} />
          {/* Help icon */}
          <Help sx={{ fontSize: "25px" }} />
          {/* User profile dropdown or Login button */}
          {isLoggedIn ? (
            <FormControl variant="standard" value={fullName}>
              {/* ... existing dropdown ... */}
            </FormControl>
          ) : (
            <Typography
              onClick={() => navigate("/login")}
              sx={{
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
            >
              Login
            </Typography>
          )}
        </FlexBetween>
      ) : (
        // Mobile navigation (hamburger menu)
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* Mobile navigation menu */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* Close icon */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Menu items */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            {/* Dark mode toggle */}
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            {/* Message icon */}
            <Message sx={{ fontSize: "25px" }} />
            {/* Notifications icon */}
            <Notifications sx={{ fontSize: "25px" }} />
            {/* Help icon */}
            <Help sx={{ fontSize: "25px" }} />
            {/* User profile dropdown */}
            {isLoggedIn ? (
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
            ): (<Typography
              onClick={() => navigate("/login")}
              sx={{
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
            >
              Login
            </Typography>
          )}
           </FlexBetween> {/* This closing tag was missing */}
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;


