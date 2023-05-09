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
  const [fullWidth] = React.useState(true);
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
    password: "",
    profilePic: "https://placeholder.png",
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
    password: "",
    profilePic: "https://placeholder.png",
    phoneNumber: "",
    Program: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateUser = (event) => {
    
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
        console.log({ ...facultySelection, Program: event.target.value });
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

  const handleERPChange = (event) => {
    if (userType === "Student") {
      setStudentSelection({
        ...studentSelection,
        ERP: event.target.value,
      });
    } else if (userType === "Faculty") {
      setFacultySelection({
        ...facultySelection,
        ERP: event.target.value,
      });
    }
  };

  const handlePhoneChange = (event) => {
    if (userType === "Student") {
      setStudentSelection({
        ...studentSelection,
        phoneNumber: event.target.value,
      });
    } else if (userType === "Faculty") {
      setFacultySelection({
        ...facultySelection,
        phoneNumber: event.target.value,
      });
    }
  };

  const handleProfilePicChange = (event) => {
    if (userType === "Student") {
      setStudentSelection({
        ...studentSelection,
        profilePic: event.target.value,
      });
    } else if (userType === "Faculty") {
      setFacultySelection({
        ...facultySelection,
        profilePic: event.target.value,
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
              <FormControl sx={{ mt: 2, mb: 2, ml: 6.5, minWidth: 120 }}>
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
                        success="true"
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
                      type="Password"
                      value={facultySelection.password}
                      onChange={handlePasswordChange}
                    />
                  </FormControl>
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    {checkPassword() ? (
                      <TextField
                        label="Confirm Password"
                        value={cPassFaculty}
                        type="Password"
                        onChange={(e) => setCpassFaculty(e.target.value)}
                        success="true"
                      />
                    ) : (
                      <TextField
                        sx={{ marginBottom: "-20px" }}
                        label="Confirm Password"
                        helperText="Passwords don't match"
                        type="Password"
                        value={cPassFaculty}
                        onChange={(e) => setCpassFaculty(e.target.value)}
                        error={true}
                      />
                    )}
                  </FormControl>
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
              {userType === "Student" ? (
                <React.Fragment>
                  {" "}
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <TextField
                      label="ERP"
                      type="number"
                      value={studentSelection.ERP}
                      onChange={handleERPChange}
                    />
                  </FormControl>
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <TextField
                      label="Phone"
                      type="number"
                      value={studentSelection.phoneNumber}
                      onChange={handlePhoneChange}
                    />
                  </FormControl>
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <TextField
                      label="CGPA"
                      type="number"
                      value={studentSelection.CGPA}
                      onChange={(event) =>
                        setStudentSelection({
                          ...studentSelection,
                          CGPA: event.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <TextField
                      label="Profile Picture"
                      value={studentSelection.profilePic}
                      onChange={handleProfilePicChange}
                    />
                  </FormControl>{" "}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {" "}
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <TextField
                      label="ERP"
                      type="number"
                      value={facultySelection.ERP}
                      onChange={handleERPChange}
                    />
                  </FormControl>
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <TextField
                      label="Phone"
                      type="number"
                      value={facultySelection.phoneNumber}
                      onChange={handlePhoneChange}
                    />
                  </FormControl>
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <TextField
                      label="Profile Picture"
                      value={facultySelection.profilePic}
                      onChange={handleProfilePicChange}
                    />
                  </FormControl>{" "}
                </React.Fragment>
              )}
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
              <FormControl sx={{ mt: 8, minWidth: 225 }}>
                <InputLabel htmlFor="max-width">Program</InputLabel>
                <Select
                  autoFocus
                  value={studentSelection.Program}
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
          </DialogContent>
          <DialogActions sx={{ padding: 2 }}>
            <ThemeProvider theme={theme}>
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
              {(userType === "Student" &&
                (!studentSelection.fullName ||
                  !studentSelection.email ||
                  !studentSelection.password ||
                  !studentSelection.ERP ||
                  !studentSelection.phoneNumber ||
                  !studentSelection.CGPA ||
                  !studentSelection.profilePic)) ||
              !checkPassword() ? (
                <Button
                  disabled={true}
                  variant="contained"
                  onClick={handleCreateUser}
                >
                  Create
                </Button>
              ) : (userType === "Faculty" &&
                  (!facultySelection.fullName ||
                    !facultySelection.email ||
                    !facultySelection.password ||
                    !facultySelection.ERP ||
                    !facultySelection.phoneNumber ||
                    !facultySelection.profilePic)) ||
                !checkPassword() ? (
                <Button
                  disabled={true}
                  variant="contained"
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
