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
import { createCourse } from "../api/apis";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function CreateCourse() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [creditHours, setCreditHours] = React.useState("");
  const [selectedProgram, setSelectedProgram] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [programs] = React.useState(
    JSON.parse(sessionStorage.getItem("Programs"))
  );
  const [error, setError] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleProgramChange = (event) => {
    setSelectedProgram(event.target.value);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      setOpenSnack(false);
    }
    setOpenSnack(false);
  };
  const handleCreateCourse = async () => {
    let input = {
      courseName: name,
      courseCode: code,
      courseDescription: description,
      creditHours: creditHours,
      program: selectedProgram,
    };
    const response = await createCourse(input);
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
      <div className="add-course">
        <ThemeProvider theme={theme}>
          <Button variant="contained" onClick={handleClickOpen}>
            ADD COURSE
          </Button>
        </ThemeProvider>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Create New Course</DialogTitle>
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
                  label="Course Name"
                />
              </FormControl>
              <FormControl sx={{ mt: 3, mb: 2, minWidth: 200 }}>
                <TextField
                  autoFocus
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  label="Course Code"
                />
              </FormControl>
              <FormControl sx={{ mt: 3, mb: 2, minWidth: 200 }}>
                <TextField
                  type="number"
                  autoFocus
                  value={creditHours}
                  onChange={(event) => setCreditHours(event.target.value)}
                  label="Credit hours"
                />
              </FormControl>
              <FormControl sx={{ mt: 3, mb: 2, minWidth: 200 }}>
                <InputLabel htmlFor="max-width">Program</InputLabel>
                <Select
                  autoFocus
                  value={selectedProgram}
                  onChange={handleProgramChange}
                  label="Program"
                >
                  {programs ? (
                    programs.map((val) => {
                      return (
                        <MenuItem key={val._id} value={val._id}>
                          {val.code}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{
                marginLeft: "4.8%"
            }}>
              <FormControl sx={{ mt: 3, mb: 2, minWidth: 500 }}>
                <TextField
                  multiline={true}
                  autoFocus
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  label="Course Description"
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

            {!name || !code || !description || !selectedProgram || !creditHours ? (
              <Button
                disabled={true}
                variant="contained"
                onClick={handleCreateCourse}
              >
                Create
              </Button>
            ) : (
              <Button variant="contained" onClick={handleCreateCourse}>
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
              Course Created Successfully
            </MuiAlert>
          </Snackbar>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
