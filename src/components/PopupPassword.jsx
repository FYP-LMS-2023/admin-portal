import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Toolbar } from "@mui/material";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { updatePassword } from "../api/apis";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const PopupPassword = () => {
  const [open, setOpen] = React.useState(false);
  const [OldPassword, setOldPassword] = React.useState();
  const [NewPassword, setNewPassword] = React.useState();
  const [CPassword, setCPassword] = React.useState();
  const [openSnack, setOpenSnack] = React.useState(false);

  const [error, setError] = React.useState("");
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState("sm");

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      setOpenSnack(false);
    }
    setOpenSnack(false);
  };

  const checkpass = () => {
    return NewPassword === CPassword ? true : false;
  };
  const checkpassword = checkpass();

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handlecurrpass = (e) => {
    setOldPassword(e.target.value);
  };
  const handlenewpass = (e) => {
    setNewPassword(e.target.value);
  };
  const handlecpass = (e) => {
    setCPassword(e.target.value);
  };

  const handleClick = async () => {
    let input = {
      currPass: OldPassword,
      newPass: NewPassword,
      confirmPass: CPassword,
    };
    const response = await updatePassword(input);
    if (response.status === 200) {
      setError("");
      console.log(response);
      setOpenSnack(true);
      setTimeout(() => {
        setOpen(false);
        window.location.reload(false);
      }, 1000);
    } else {
      setError(response.response.data.message);
    }
  };

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        onClick={handleClickOpen}
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
        Change Password
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle id="responsive-dialog-title">
          {"Change Password"}
        </DialogTitle>
        <DialogContent>
          <Toolbar sx={{ padding: 2 }}>
            <ThemeProvider theme={theme}>
              <div className="currpass">
                {" "}
                <TextField
                  label="Current Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handlecurrpass}
                />
              </div>

              <div className="newpass">
                <TextField
                  label="New Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handlenewpass}
                />
              </div>
            </ThemeProvider>
          </Toolbar>
          <Toolbar>
            <ThemeProvider theme={theme}>
              {checkpassword || (!CPassword && !NewPassword) ? (
                <div className="cnpass">
                  <TextField
                    color="success"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={handlecpass}
                  />
                </div>
              ) : (
                <div className="cnpass">
                  <TextField
                    error
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={handlecpass}
                  />
                </div>
              )}
            </ThemeProvider>
          </Toolbar>
          {error && (
            <>
              <h5 style={{ color: "red", opacity: "50%", marginTop: "-35px", marginLeft: "25px" }}>
                {error}
              </h5>
            </>
          )}
          {!checkpassword && CPassword ? (
            <h5 style={{ color: "red", opacity: "50%", marginTop: "-5px", marginLeft: "25px" }}>
              {"Passwords don't match"}
            </h5>
          ) : (
            ""
          )}
        </DialogContent>
        <ThemeProvider theme={theme}>
          <DialogActions sx={{ padding: 2 }}>
            <Button autoFocus variant="outlined" onClick={handleClose}>
              {" "}
              Close{" "}
            </Button>

            {checkpassword && CPassword ? (
              <Button
                sx={{
                  ":hover": {
                    bgcolor: "#999",
                    color: "white",
                  },
                }}
                autoFocus
                variant="contained"
                onClick={handleClick}
              >
                {" "}
                Update{" "}
              </Button>
            ) : (
              <Button
                disabled
                autoFocus
                variant="contained"
                onClick={handleClick}
              >
                {" "}
                Update{" "}
              </Button>
            )}
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={openSnack}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <MuiAlert
                onClose={handleCloseSnack}
                severity="success"
                sx={{ width: "100%" }}
              >
                Password Updated Successfully
              </MuiAlert>
            </Snackbar>
          </DialogActions>
        </ThemeProvider>
      </Dialog>
    </div>
  );
};

export default PopupPassword;
