import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { createProgram } from "../api/apis";
import { TextField } from "@mui/material";

export default function CreateProgram() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      setOpenSnack(false);
    }
    setOpenSnack(false);
  };
  const handleCreateSemester = async () => {
    let input = {
      name: name,
      code: code,
      description: description,
    };
    const response = await createProgram(input);
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
    <React.Fragment>
      <div className="add-semester">
        <ThemeProvider theme={theme}>
          <Button variant="contained" onClick={handleClickOpen}>
            ADD PROGRAM
          </Button>
        </ThemeProvider>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Create New Program</DialogTitle>
        <DialogContent>
          <ThemeProvider theme={theme}>
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
                // width: "fit-content",
              }}
            >
              <FormControl sx={{ mt: 3, mb: 2, minWidth: 200 }}>
                <TextField
                  autoFocus
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  label="Name"
                />
              </FormControl>
              <FormControl sx={{ mt: 3, mb: 2, minWidth: 200 }}>
                <TextField
                  autoFocus
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  label="Code"
                />
              </FormControl>
              <FormControl sx={{ mt: 3, mb: 2, minWidth: 500 }}>
                <TextField
                  multiline={true}
                  autoFocus
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  label="Description"
                  rows={5}
                />
              </FormControl>
            </Box>
          </ThemeProvider>
        </DialogContent>
        <h3 style={{ color: "red", opacity: "55%" }}>
          <center>{error}</center>
        </h3>
        <DialogActions sx={{ padding: 2 }}>
          <ThemeProvider theme={theme}>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>

            {!name || !code || !description ? (
              <Button
                disabled={true}
                variant="contained"
                onClick={handleCreateSemester}
              >
                Create
              </Button>
            ) : (
              <Button variant="contained" onClick={handleCreateSemester}>
                Create
              </Button>
            )}
          </ThemeProvider>
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
              Program Created Successfully
            </MuiAlert>
          </Snackbar>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
