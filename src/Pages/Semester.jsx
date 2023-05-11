import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAllSemesters } from "../api/apis";
import CreateSemester from "../components/CreateSemester";
import SemesterTable from "../components/SemesterTable";

const Semester = () => {
  const [loading, setLoading] = React.useState(false);
  const [blockStatus, setBlockStatus] = React.useState({});

  React.useEffect(() => {
    const fetchSemesters = async () => {
      setLoading(true);
      const Semesters = await getAllSemesters();
      //   const Programs = await getAllPrograms();
      //   var arr = Semesters.data;
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
      sessionStorage.setItem("Semesters", JSON.stringify(Semesters.data));
      //   sessionStorage.setItem("Programs", JSON.stringify(Programs.data));
      setLoading(false);
    };

    fetchSemesters();
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
          <CreateSemester />
          <center>
            <SemesterTable
              blockStatus={blockStatus}
              setBlockStatus={setBlockStatus}
            />
          </center>
        </div>
      )}
    </>
  );
};

export default Semester;
