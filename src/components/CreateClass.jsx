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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { createClass } from "../api/apis";

export default function CreateClass() {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState("");
  const [courseID, setCourseID] = React.useState("");
  const [semesterID, setSemesterID] = React.useState("");
  const [error, setError] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const [courses] = React.useState(
    JSON.parse(sessionStorage.getItem("Courses"))
  );
  const [semesters] = React.useState(
    JSON.parse(sessionStorage.getItem("Semesters"))
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
  const handleCreateClass = async () => {
    let object = {
      startDate: startDate,
      courseID: courseID,
      semesterID: semesterID,
    };
    console.log(object)
    const response = await createClass(object);
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
  const handleCourseChange = (event) => {
    setCourseID(event.target.value);
  };
  const handleSemesterChange = (event) => {
    setSemesterID(event.target.value)
  }
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
          <Button sx={{marginRight: "15px", minWidth: "170px"}} variant="contained" onClick={handleClickOpen}>
            ADD CLASS
          </Button>
        </ThemeProvider>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Create New Class</DialogTitle>
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <FormControl sx={{ mt: 3, mb: 2, minWidth: 200 }}>
                <InputLabel htmlFor="Semester">Semester</InputLabel>
                <Select
                  autoFocus
                  value={semesterID}
                  onChange={handleSemesterChange}
                  label="Semester"
                >
                  {semesters ? (
                    semesters.map((val) => {
                      return (
                        <MenuItem key={val.semesterName} value={val.semesterID}>
                          {val.semesterName}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Select>
              </FormControl>
              <FormControl sx={{ mt: 3, mb: 2, minWidth: 275 }}>
                <InputLabel htmlFor="Course">Course</InputLabel>
                <Select
                  autoFocus
                  value={courseID}
                  onChange={handleCourseChange}
                  label="Course"
                >
                  {courses ? (
                    courses.map((val) => {
                      return (
                        <MenuItem key={val.course._id} value={val.course._id}>
                          {val.course.courseName}
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

            {!courseID || !semesterID || !startDate  ? (
              <Button
                disabled={true}
                variant="contained"
                onClick={handleCreateClass}
              >
                Create
              </Button>
            ) : (
              <Button variant="contained" onClick={handleCreateClass}>
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
              Class Created Successfully
            </MuiAlert>
          </Snackbar>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
