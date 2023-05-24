import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { login } from "../api/apis";

export default function Login() {
  const [email, setEmail] = React.useState("admin@gmail.com");
  const [password, setPassword] = React.useState("123456");
  const [inputError, setInputError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#000000",
      },
    },
  });
  const handleSubmit = async (event) => {
    setLoading(true);
    const result = await login(email, password);
    if (result.status !== 200) {
      setLoading(false);
      setInputError(result.response.data.message);
    } else {
      if (result.data.isAdmin) {
        sessionStorage.setItem("token", JSON.stringify(result.data.token));
        setLoading(false);
        window.location.assign("/home");
      } else {
        setLoading(false);
        setInputError("Admin credentials required!");
      }
    }
  };

  return (
    <div className="login">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            SMASH LMS ADMIN
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <ThemeProvider theme={theme}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                autoComplete="email"
                autoFocus
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                autoComplete="current-password"
              />
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </ThemeProvider>
            <h5 style={{ color: "red", opacity: "50%", marginTop: "-5px" }}>
              {inputError}
            </h5>
            {!email || !password || loading ? (
              <Button
                disabled={true}
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 0, mb: 2, backgroundColor: "black" }}
              >
                LogIn
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{
                  mt: 0,
                  mb: 2,
                  backgroundColor: "black",
                  ":hover": {
                    bgcolor: "#999",
                    color: "white",
                  },
                }}
              >
                LogIn
              </Button>
            )}
            <ThemeProvider theme={theme}>
              <center>
                {loading ? <CircularProgress sx={{ mt: "5%" }} /> : <></>}
              </center>
            </ThemeProvider>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
