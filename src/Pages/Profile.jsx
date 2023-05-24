import React from "react";
import { getProfile } from "../api/apis";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Box,  InputLabel, Typography } from "@mui/material";
import PopupPassword from "../components/PopupPassword";

const Profile = () => {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState("");

  React.useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const User = await getProfile();
      sessionStorage.setItem("User", JSON.stringify(User.data.user));
      setUser(User.data.user);
      //   sessionStorage.setItem("Programs", JSON.stringify(Programs.data));
      setLoading(false);
    };

    fetchUser();
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#ffffff",
      },
    },
  });

  return (
    <>
      {!loading ? (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10%",
            }}
          >
            <Paper
              elevation={10}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                width: 915,
                height: 430,
              }}
            >
              <img
                src={user.profilePic}
                alt="Girl in a jacket"
                width="300"
                height="250"
              />

              <div className="outer">
                <div className="row-1">
                  <div className="Label-1">
                    <InputLabel sx={{ width: "75px", fontWeight: "bold" }}>
                      Name:{" "}
                    </InputLabel>
                    <Typography sx={{ marginRight: "200px" }}>
                      {user.fullName}
                    </Typography>
                  </div>
                  <div className="Label-2">
                    <InputLabel sx={{ width: "75px", fontWeight: "bold" }}>Email: </InputLabel>
                    <Typography>{user.email}</Typography>
                  </div>
                </div>
                <div className="row-2">
                  <div className="Label-3">
                    <InputLabel sx={{ width: "75px", fontWeight: "bold" }}>Phone: </InputLabel>
                    <Typography sx={{ marginRight: "177px" }}>
                      {user.phoneNumber}
                    </Typography>
                  </div>
                  <div className="Label-4">
                    <InputLabel sx={{ width: "75px", fontWeight: "bold" }}>Type: </InputLabel>
                    <Typography>{user.userType}</Typography>
                  </div>
                </div>
                <div className="row-3">
                    <PopupPassword />
                </div>
              </div>
            </Paper>
          </Box>
        </>
      ) : (
        <ThemeProvider theme={theme}>
          <div className="loader">
            <CircularProgress />
          </div>
        </ThemeProvider>
      )}
    </>
  );
};

export default Profile;
