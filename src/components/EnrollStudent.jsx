import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { enrollStudent } from "../api/apis";

export default function EnrollStudent() {
  const [open, setOpen] = React.useState(false);
  const [classID, setClassID] = React.useState("");
  const [studentID, setStudentID] = React.useState("");
  const [error, setError] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const [Students] = React.useState(
    JSON.parse(sessionStorage.getItem("Students"))
  );
  const [classes] = React.useState(
    JSON.parse(sessionStorage.getItem("Classes"))
  );

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
  const handleEnrollStudent = async () => {
    let object = {
      studentID: studentID,
      classID: classID,
    };
    // console.log(object);
    const response = await enrollStudent(object);
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
  const handleStudentChange = (event) => {
    setStudentID(event.target.value);
  };
  const handleClassChange = (event) => {
    setClassID(event.target.value);
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
      <div className="">
        <ThemeProvider theme={theme}>
          <Button sx={{minWidth: "170px"}} variant="contained" onClick={handleClickOpen}>
            Enroll Student
          </Button>
        </ThemeProvider>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Enroll Student</DialogTitle>
        <DialogContent>
          <ThemeProvider theme={theme}>
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                // width: "fit-content",
              }}
            >
              <FormControl sx={{ mt: 3, mb: 2, minWidth: 275 }}>
                <InputLabel htmlFor="Class">Class</InputLabel>
                <Select
                  autoFocus
                  value={classID}
                  onChange={handleClassChange}
                  label="Class"
                >
                  {classes ? (
                    classes.map((val) => {
                      return (
                        <MenuItem key={val.class._id} value={val.class._id}>
                          {`${val.class.semesterID.semesterName} - ${val.course.courseName}`}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Select>
              </FormControl>
              <FormControl sx={{ mt: 3, mb: 2, minWidth: 275 }}>
                <InputLabel htmlFor="Students">Students</InputLabel>
                <Select
                  autoFocus
                  value={studentID}
                  onChange={handleStudentChange}
                  label="Students"
                >
                  {Students ? (
                    Students.map((val) => {
                      return (
                        <MenuItem key={val._id} value={val._id}>
                          {`${val.fullName} - ${val.ERP}`}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Select>
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

            {!studentID || !classID ? (
              <Button
                disabled={true}
                variant="contained"
                onClick={handleEnrollStudent}
              >
                Enroll
              </Button>
            ) : (
              <Button variant="contained" onClick={handleEnrollStudent}>
                Enroll
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
              Student Enrolled Successfully
            </MuiAlert>
          </Snackbar>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
