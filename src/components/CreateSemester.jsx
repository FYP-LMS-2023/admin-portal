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
import { createSemester } from "../api/apis";

export default function CreateSemester() {
  const [open, setOpen] = React.useState(false);
  const [term, setTerm] = React.useState("");
  const [year, setYear] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
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
    const response = await createSemester(term, year, startDate, endDate);
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
            ADD SEMESTER
          </Button>
        </ThemeProvider>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Create New Semester</DialogTitle>
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
              <FormControl sx={{ mt: 3, mb: 2, minWidth: 200 }}>
                <InputLabel htmlFor="Term">Term</InputLabel>
                <Select
                  autoFocus
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  label="Term"
                  inputProps={{
                    name: "max-width",
                    id: "max-width",
                  }}
                >
                  <MenuItem value="SUMMER">Summer</MenuItem>
                  <MenuItem value="FALL">Fall</MenuItem>
                  <MenuItem value="SPRING">Spring</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ mt: 3, mb: 2, minWidth: 200 }}>
                <InputLabel htmlFor="year">Year</InputLabel>
                <Select
                  autoFocus
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                  label="year"
                  inputProps={{
                    name: "max-width",
                    id: "max-width",
                  }}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2026">2026</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
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

            {!term || !year || !startDate || !endDate ? (
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
              Semester Created Successfully
            </MuiAlert>
          </Snackbar>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
