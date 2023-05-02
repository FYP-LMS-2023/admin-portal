import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material';
import user from "../public/user.png"
import semester from "../public/semester.png"

export default function HomeCard(props) {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#000000",

            },
            secondary: {
                main: "#FFFFFF"
            }
        },
    });
    return (
        <Box sx={{ minWidth: 300 }}>
            <ThemeProvider theme={theme} >
                <Card variant="outlined" className='card' style={{ backgroundColor: "#000000" }}>
                    <React.Fragment>
                        <CardContent className='content'>
                            <img src={props.icon} style={{width: "100px", height: "100px"}} alt=" Hello " />
                            <Typography sx={{
                                fontSize: 22, fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                            }} color="secondary" >
                                {props.title}
                            </Typography>

                        </CardContent>
                    </React.Fragment>
                </Card>
            </ThemeProvider>
        </Box>
    );
}
