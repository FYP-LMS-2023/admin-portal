import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAllCourses, getAllPrograms } from "../api/apis";
import CreateCourse from "../components/CreateCourse";
import CourseTable from "../components/CourseTable";

const Course = () => {
  const [loading, setLoading] = React.useState(false);
  const [blockStatus, setBlockStatus] = React.useState({});

  React.useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      const Programs = await getAllPrograms();
      const Courses = await getAllCourses();
      //   const Programs = await getAllPrograms();
      //   var arr = Programs.data;
      // var finalUsers = [];
      // var arr2 = [];
      // for (var i = 0; i < arr.length; i++) {
      //   var temp = {
      //     id: i + 1,
      //     ...arr[i],
      //   };
      //   finalUsers.push(temp);
      //   var temp2 = { ERP: arr[i].ERP, deleteFlag: arr[i].deleteFlag };
      //   arr2.push(temp2);
      // }
      sessionStorage.setItem("Programs", JSON.stringify(Programs.data));
      sessionStorage.setItem("Courses", JSON.stringify(Courses.data));
      setLoading(false);
    };

    fetchPrograms();
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
        <div className="User">
          <CreateCourse />
          <center>
            <CourseTable
              blockStatus={blockStatus}
              setBlockStatus={setBlockStatus}
            />
          </center>
        </div>
      )}
    </>
  );
};

export default Course;
