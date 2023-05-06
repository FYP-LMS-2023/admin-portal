import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAllUsers } from "../api/apis";
import UsersTable from "../components/UsersTable";
const User = () => {
  const [loading, setLoading] = React.useState(false);
  const [blockStatus, setBlockStatus] = React.useState({});

  React.useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const Users = await getAllUsers();
      var arr = Users.data;
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
      sessionStorage.setItem("Users", JSON.stringify(arr));

      setLoading(false);
    };

    fetchUsers();
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#000000",
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
        <div>
          <center>
            <UsersTable blockStatus={blockStatus} setBlockStatus={setBlockStatus} />
          </center>
        </div>
      )}
    </>
  );
};

export default User;
