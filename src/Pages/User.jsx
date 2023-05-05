import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAllUsers } from "../api/apis";

const User = () => {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const Users = await getAllUsers();
      sessionStorage.setItem("Users", JSON.stringify(Users.data));
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
          <h1>Users page</h1>
        </div>
      )}
    </>
  );
};

export default User;
