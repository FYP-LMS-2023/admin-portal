import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";

export default function HomeCard(props) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
  });

  const handleClick = () => {
    window.location.assign(props.link);
  };
  return (
    <Box sx={{ minWidth: 300 }}>
      <ThemeProvider theme={theme}>
        <Card
          variant="outlined"
          className="card"
          style={{ backgroundColor: "#000000", borderRadius: "5%" }}
          onClick={handleClick}
        >
          <React.Fragment>
            <CardContent className="card-content">
              <div className="content">
                <img
                  src={props.icon}
                  style={{ width: "100px", height: "100px" }}
                  alt=" Hello "
                />
                <Typography
                  sx={{
                    fontSize: 22,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                  }}
                  color="secondary"
                >
                  {props.title}
                </Typography>
              </div>
            </CardContent>
          </React.Fragment>
        </Card>
      </ThemeProvider>
    </Box>
  );
}
