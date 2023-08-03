import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import ViewPage from "scenes/viewPage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

/**
 * The App component is the root component of the application.
 * It renders the main layout of the app and handles routing.
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  // Get the mode from the Redux store
  const mode = useSelector((state) => state.mode);

  // Create a theme based on the mode using the themeSettings function
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // Check if the user is authenticated by checking the token in the Redux store
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Render the LoginPage component for the root path */}
            <Route path="/" element={<LoginPage />} />

            {/* Render the HomePage component if the user is authenticated, otherwise navigate to the root path */}
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />

            {/* Render the ViewPage component regardless of authentication */}
            <Route path="/view" 
            element={<ViewPage />} />


            {/* Render the ProfilePage component if the user is authenticated, otherwise navigate to the root path */}
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
