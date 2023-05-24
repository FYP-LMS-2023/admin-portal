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
import { assignTeacher } from "../api/apis";

export default function AssignTeacher() {
  const [open, setOpen] = React.useState(false);
  const [classID, setClassID] = React.useState("");
  const [teacherID, setTeacherID] = React.useState("");
  const [error, setError] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const [Faculty] = React.useState(
    JSON.parse(sessionStorage.getItem("Faculty"))
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
  const handleAssignTeacher = async () => {
    let object = {
      teacherID: teacherID,
      classID: classID,
    };
    // console.log(object);
    const response = await assignTeacher(object);
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
  const handleTeacherChange = (event) => {
    setTeacherID(event.target.value);
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
          <Button sx={{minWidth: "170px"}}  variant="contained" onClick={handleClickOpen}>
            ASSIGN Teacher
          </Button>
        </ThemeProvider>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Assign Teacher</DialogTitle>
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
                <InputLabel htmlFor="Faculty">Faculty</InputLabel>
                <Select
                  autoFocus
                  value={teacherID}
                  onChange={handleTeacherChange}
                  label="Faculty"
                >
                  {Faculty ? (
                    Faculty.map((val) => {
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

            {!teacherID || !classID ? (
              <Button
                disabled={true}
                variant="contained"
                onClick={handleAssignTeacher}
              >
                Assign
              </Button>
            ) : (
              <Button variant="contained" onClick={handleAssignTeacher}>
                Assign
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
              Teacher Assigned Successfully
            </MuiAlert>
          </Snackbar>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
