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
import { TextField } from "@mui/material";

export default function CreateUser() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [userType, setUserType] = React.useState("Student");
  const [cPassStudent, setCpassStudent] = React.useState("");
  const [cPassFaculty, setCpassFaculty] = React.useState("");
  const [programs] = React.useState(
    JSON.parse(sessionStorage.getItem("Programs"))
  );
  const [studentSelection, setStudentSelection] = React.useState({
    email: "",
    fullName: "",
    ERP: "",
    userType: "Student",
    notifications: [],
    courses: [],
    password: "saad",
    profilePic: "",
    phoneNumber: "",
    CGPA: "",
    Program: "",
  });
  const [facultySelection, setFacultySelection] = React.useState({
    email: "",
    fullName: "",
    ERP: "",
    userType: "Faculty",
    notifications: [],
    courses: [],
    password: "",
    profilePic: "",
    phoneNumber: "",
    CGPA: "",
    Program: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateUser = (event) => {
    setFullWidth(event.target.checked);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  const handleProgramChange = (event) => {
    if (userType === "Student") {
      setStudentSelection({ ...studentSelection, Program: event.target.value });
      console.log({ ...studentSelection, Program: event.target.value });
    } else if (userType === "Faculty") {
      setFacultySelection({ ...facultySelection, Program: event.target.value });
      //   console.log({ ...facultySelection, Program: event.target.value });
    }
  };
  const handleNameChange = (event) => {
    if (userType === "Student") {
      setStudentSelection({
        ...studentSelection,
        fullName: event.target.value,
      });
    } else if (userType === "Faculty") {
      setFacultySelection({
        ...facultySelection,
        fullName: event.target.value,
      });
    }
  };
  const handleEmailChange = (event) => {
    if (userType === "Student") {
      setStudentSelection({
        ...studentSelection,
        email: event.target.value,
      });
    } else if (userType === "Faculty") {
      setFacultySelection({
        ...facultySelection,
        email: event.target.value,
      });
    }
  };
  const handlePasswordChange = (event) => {
    if (userType === "Student") {
      setStudentSelection({
        ...studentSelection,
        password: event.target.value,
      });
    } else if (userType === "Faculty") {
      setFacultySelection({
        ...facultySelection,
        password: event.target.value,
      });
    }
  };
  const checkPassword = () => {
    if (userType === "Student") {
      return studentSelection.password === cPassStudent;
    } else if (userType === "Faculty") {
      return facultySelection.password === cPassFaculty;
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
      <ThemeProvider theme={theme}>
        <div className="add-user">
          <ThemeProvider theme={theme}>
            <Button variant="contained" onClick={handleClickOpen}>
              ADD USER
            </Button>
          </ThemeProvider>
        </div>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={"lg"}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Create New User</DialogTitle>
          <DialogContent>
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                //   m: "auto",
                width: "fit-content",
              }}
            >
              <FormControl sx={{ mt: 2, ml: 4, minWidth: 120 }}>
                <InputLabel htmlFor="max-width">User Type</InputLabel>
                <Select
                  autoFocus
                  value={userType}
                  onChange={handleUserTypeChange}
                  label="maxWidth"
                  inputProps={{
                    name: "max-width",
                    id: "max-width",
                  }}
                >
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Faculty">Faculty</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "row",
                //   m: "auto",
                alignItems: "center",
                justifyContent: "space-evenly",
                // width: "fit-content",
              }}
            >
              {userType === "Student" ? (
                <React.Fragment>
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <TextField
                      label="Full Name"
                      value={studentSelection.fullName}
                      onChange={handleNameChange}
                    />
                  </FormControl>
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <TextField
                      label="Email"
                      value={studentSelection.email}
                      onChange={handleEmailChange}
                    />
                  </FormControl>
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <TextField
                      label="Password"
                      type="Password"
                      value={studentSelection.password}
                      onChange={handlePasswordChange}
                    />
                  </FormControl>
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    {checkPassword() ? (
                      <TextField
                        label="Confirm Password"
                        value={cPassStudent}
                        type="Password"
                        onChange={(e) => setCpassStudent(e.target.value)}
                        success
                      />
                    ) : (
                      <TextField
                        sx={{ marginBottom: "-20px" }}
                        label="Confirm Password"
                        helperText="Passwords don't match"
                        type="Password"
                        value={cPassStudent}
                        onChange={(e) => setCpassStudent(e.target.value)}
                        error={true}
                      />
                    )}
                  </FormControl>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {" "}
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <TextField
                      label="Full Name"
                      value={facultySelection.fullName}
                      onChange={handleNameChange}
                    />
                  </FormControl>
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <TextField
                      label="Email"
                      value={facultySelection.email}
                      onChange={handleEmailChange}
                    />
                  </FormControl>
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <TextField
                      label="Password"
                      value={facultySelection.password}
                      onChange={handlePasswordChange}
                    />
                  </FormControl>
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <TextField label="Confirm Password" />
                  </FormControl>{" "}
                </React.Fragment>
              )}
            </Box>
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "row",
                //   m: "auto",
                alignItems: "center",
                justifyContent: "space-evenly",
                // width: "fit-content",
              }}
            >
              <FormControl sx={{ mt: 2, minWidth: 120 }}>
                <TextField label="ERP" type="number" />
              </FormControl>
              <FormControl sx={{ mt: 2, minWidth: 120 }}>
                <TextField label="Phone" type="number" />
              </FormControl>
              <FormControl sx={{ mt: 2, minWidth: 120 }}>
                <TextField label="CGPA" type="number" />
              </FormControl>
              <FormControl sx={{ mt: 2, minWidth: 120 }}>
                <TextField label="Profile Picture" />
              </FormControl>
            </Box>
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                //   m: "auto",
                alignItems: "center",
                justifyContent: "space-evenly",
                // width: "fit-content",
              }}
            >
              <FormControl sx={{ mt: 2, minWidth: 225 }}>
                <InputLabel htmlFor="max-width">Program</InputLabel>
                <Select
                  autoFocus
                  value={studentSelection.Program}
                  onChange={handleProgramChange}
                  label="Program"
                >
                  {programs.map((val) => {
                    return (
                      <MenuItem key={val._id} value={val._id}>
                        {val.code}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl sx={{ mt: 2, minWidth: 120 }}>
                <TextField label="Phone" type="number" />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ padding: 2 }}>
            <ThemeProvider theme={theme}>
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
              {userType === "Student" &&
              (studentSelection.fullName ||
              studentSelection.email ||
              studentSelection.password ||
              studentSelection.ERP ||
              studentSelection.phoneNumber ||
              studentSelection.CGPA ||
              studentSelection.profilePic) ? (
                <Button
                  disabled={true}
                  variant="contained"
                  onClick={handleCreateUser}
                >
                  Create
                </Button>
              ) : (
                <Button variant="contained" onClick={handleCreateUser}>
                  Create
                </Button>
              )}
            </ThemeProvider>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </React.Fragment>
  );
}
