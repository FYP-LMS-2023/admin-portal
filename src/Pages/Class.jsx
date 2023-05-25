import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ClassTable from "../components/ClassTable";
import CreateClass from "../components/CreateClass";
import AssignTA from "../components/AssignTA";
import AssignTeacher from "../components/AssignTeacher";
import {
  getAllClasses,
  getAllCourses,
  getAllSemesters,
  getFaculty,
  getStudents,
} from "../api/apis";
import EnrollStudent from "../components/EnrollStudent";

const Class = () => {
  const [loading, setLoading] = React.useState(false);
  const [blockStatus, setBlockStatus] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const Classes = await getAllClasses();
      const Courses = await getAllCourses();
      const Semesters = await getAllSemesters();
      const Students = await getStudents();
      const Faculty = await getFaculty();

      sessionStorage.setItem("Classes", JSON.stringify(Classes.data));
      sessionStorage.setItem("Courses", JSON.stringify(Courses.data));
      sessionStorage.setItem("Semesters", JSON.stringify(Semesters.data));
      sessionStorage.setItem("Students", JSON.stringify(Students.data));
      sessionStorage.setItem("Faculty", JSON.stringify(Faculty.data));
      setLoading(false);
    };

    fetchData();
  }, []);

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
    <>
      {loading ? (
        <ThemeProvider theme={theme}>
          <div className="loader">
            <CircularProgress />
          </div>
        </ThemeProvider>
      ) : (
        <div className="">
          <div className="buttons">
            <CreateClass />
            <AssignTA />
            <AssignTeacher />
            <EnrollStudent />
          </div>
          <center>
            <ClassTable
              blockStatus={blockStatus}
              setBlockStatus={setBlockStatus}
            />
          </center>
        </div>
      )}
    </>
  );
};

export default Class;
