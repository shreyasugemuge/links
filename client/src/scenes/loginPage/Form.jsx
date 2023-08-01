import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { YouTube } from "@mui/icons-material";

/**
 * Register schema for validating registration form inputs.
 * - firstName: string, required
 * - lastName: string, required
 * - email: string, must be a valid email address, required
 * - password: string, required
 * - location: string, required
 * - occupation: string, required
 * - picture: string, required
 */
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

/**
 * Login schema for validating login form inputs.
 * - email: string, must be a valid email address, required
 * - password: string, required
 */
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

/**
 * Initial values for the registration form.
 * - firstName: string, empty string
 * - lastName: string, empty string
 * - email: string, empty string
 * - password: string, empty string
 * - location: string, empty string
 * - occupation: string, empty string
 * - picture: string, empty string
 */
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

/**
 * Initial values for the login form.
 * - email: string, empty string
 * - password: string, empty string
 */
const initialValuesLogin = {
  email: "",
  password: "",
};

/**
 * Form component for user login and registration.
 * Manages the page type, dispatch, navigation, and media queries.
 * Provides functions for registering and logging in users.
 * Handles form submission based on the current page type.
 *
 * @returns {JSX.Element} The Form component.
 */
const Form = () => {
  // State variables
  const [pageType, setPageType] = useState("login");

  // Custom hooks
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Check page type
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  /**
   * Registers a new user.
   *
   * @param {Object} values - The form values.
   * @param {Object} onSubmitProps - The form submission props.
   * @returns {Promise<void>} A promise that resolves when the user is registered.
   */
  const register = async (values, onSubmitProps) => {
    // Create form data
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    // Send form data to server
    const savedUserResponse = await fetch(
      "https://linksbynk.com/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    // Update page type if user is saved
    if (savedUser) {
      setPageType("login");
    }
  };

  /**
   * Logs in a user.
   *
   * @param {Object} values - The form values.
   * @param {Object} onSubmitProps - The form submission props.
   * @returns {Promise<void>} A promise that resolves when the user is logged in.
   */
  const login = async (values, onSubmitProps) => {
    // Send login request to server
    const loggedInResponse = await fetch("https://linksbynk.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();

    // Dispatch login action and navigate to home if user is logged in
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  /**
   * Handles form submission based on the current page type.
   *
   * @param {Object} values - The form values.
   * @param {Object} onSubmitProps - The form submission props.
   * @returns {Promise<void>} A promise that resolves when the form is submitted.
   */
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  /**
   * Renders a form using the Formik library.
   *
   * Props:
   * - handleFormSubmit: Function - The function to handle form submission.
   * - isLogin: Boolean - Indicates whether the form is for login or registration.
   * - initialValuesLogin: Object - Initial values for login form fields.
   * - initialValuesRegister: Object - Initial values for registration form fields.
   * - loginSchema: Object - Validation schema for login form fields.
   * - registerSchema: Object - Validation schema for registration form fields.
   *
   * @returns {JSX.Element} The rendered form.
   */
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                {/* First Name */}
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />

                {/* Last Name */}
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />

                {/* Location */}
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />

                {/* Occupation */}
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />

                {/* Picture */}
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            {/* Email */}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />

            {/* Password */}
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;