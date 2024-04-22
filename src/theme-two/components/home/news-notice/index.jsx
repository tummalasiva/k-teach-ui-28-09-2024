import React, { useState } from "react";
import { Box, Card, Typography } from "@mui/material";

const TypographyMain = styled(Typography)(({ theme }) => ({
  // textAlign: "center",
  // marginTop: "25px",
  fontSize: "40px",
  // width:"100%",
  color: "#f86f03",
  fontWeight: "bold",
  textShadow: "10px 8px 8px #969c96",
  [theme.breakpoints.down("md")]: {
    fontSize: "30px",
  },

  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    margin: 0,
    padding: "0",
  },

  [theme.breakpoints.down(600)]: {
    fontSize: "20px",
  },
  [theme.breakpoints.down(500)]: {
    fontSize: "15px",
  },
}));

export default function index() {
  let [announceNews, setAnounceNews] = useState([]);

  return (
    <>
      <Box mx={7}>
        <Card
          sx={{
            display: "flex",
            marginTop: "40px",
            border: "2px solid #ffffff",
            boxShadow: "6px 5px 25px rgba(0,0,0,0.08)",
            marginTop: "8rem",
            borderRadius: "12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "25%",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TypographyMain
                sx={{ width: "max-content", fontWeight: 700 }}
                variant="h3"
              >
                News
              </TypographyMain>
            </Box>
          </Box>

          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              height: "250px",
              overflowY: "auto",
              justifyContent: "center",
            }}
            component="div"
            className={style.newscontainer}
          >
            {announceNews.length ? (
              <div className={style.newsscroll}>
                {announceNews.map((elem, index) => {
                  return (
                    <React.Fragment key={index}>
                      <NewsAndNotice elem={elem} />
                    </React.Fragment>
                  );
                })}
              </div>
            ) : (
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  textAlign: "center",
                  maxWidth: "900px",
                }}
              >
                No News/Events to show at the moment!
              </Typography>
            )}
            {/* </ScrollContent> */}
            {/* </ContainerWithScroll> */}
          </Box>
        </Card>
      </Box>
    </>
  );
}
