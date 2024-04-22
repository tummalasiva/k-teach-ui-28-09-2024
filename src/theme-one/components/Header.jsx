import React from "react";
import {
  Box,
  ThemeProvider,
  Typography,
  styled,
  createTheme,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const TextBox1 = styled(Box)(({ theme }) => ({
  marginTop: "3%",

  textShadow: "10px 8px 8px #969c96",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "6%",
  },
}));

export default function Header({ title1 = "", title2 = "" }) {
  const theme = createTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <TextBox1>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: { xs: "center" },
              //   flexDirection: { md: "row", xs: "column" },
            }}
          >
            <Box>
              <Typography
                variant="h3"
                color="black"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "25px", sm: "30px", md: "40px", lg: "40px" },
                }}
              >
                {title1}
              </Typography>
            </Box>
            &nbsp;&nbsp;
            <Box>
              <Typography
                variant="h3"
                sx={{
                  color: "#F86F03",
                  fontWeight: "bold",
                  fontSize: { xs: "25px", sm: "30px", md: "40px", lg: "40px" },
                }}
              >
                {title2}
              </Typography>
            </Box>
          </Box>
        </TextBox1>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "50px",
          }}
        >
          <Typography component="p">_________</Typography>
          <FiberManualRecordIcon sx={{ fontSize: "8px", marginTop: "15px" }} />
          <FiberManualRecordIcon
            sx={{
              color: "#F86F03",
              fontSize: "10px",
              marginTop: "14px",
              marginLeft: "5px",
            }}
          />
          <FiberManualRecordIcon
            sx={{ fontSize: "8px", marginTop: "15px", marginLeft: "6px" }}
          />
          <Typography component="p">_________</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
