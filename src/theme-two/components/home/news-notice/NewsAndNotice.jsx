import React, { useState } from "react";
import { Box, Card, Typography, css, keyframes, styled } from "@mui/material";
import themeData from "../../../../data/themeData";
import NewsDetails from "./NewsDetails";
import image from "../../../assets/images/school-white.avif";

const bubbleAnimation = keyframes`
  0% {
    transform: translateY(1000%);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const animatedPause = css`
  animation-play-state: paused;
`;

const MuiBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  justifyContent: "center",
  position: "relative",
  backgroundColor: "red",
  ...animatedPause,
}));

const AnimatedBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: " column-reverse",
  animation: "scroll 8s linear infinite",
}));

const MuiCard = styled(Card)(({ theme }) => ({
  display: "flex",
  height: 300,
  flexDirection: "column",
  alignItems: "center",
  marginTop: "40px",
  boxShadow: "6px 5px 25px rgba(0,0,0,0.08)",
  borderRadius: "12px",
}));

const TypographyMain = styled(Typography)(({ theme }) => ({
  fontSize: "40px",
  width: "max-content",
  fontWeight: 700,
  color: themeData.darkPalette.primary.main,
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

const AnnounceNews = [
  {
    title: "Taja Khabar aaj ke naye jivan",
    date: "12-23-12",
    image: "../../../assets/images/school-white.avif",
    shortNews: "Koi nahi janta aaj ke jamane ke logo ka soch",
    news: " React Hook React.useEffect has a missing dependency: 'SIDE_MENU_DATA'. Either include it or remove the dependency array",
  },
];

export default function NewsAndNotice() {
  let [announceNews, setAnounceNews] = useState([]);

  return (
    <>
      <Box mx={7}>
        <MuiCard>
          <TypographyMain sx={{ mt: 3 }} variant="h3">
            News & Notice
          </TypographyMain>

          <MuiBox>
            {AnnounceNews.length ? (
              <AnimatedBox>
                {AnnounceNews.map((elem, index) => {
                  return (
                    <React.Fragment key={index}>
                      <NewsDetails elem={elem} />
                    </React.Fragment>
                  );
                })}
              </AnimatedBox>
            ) : (
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                No news/events to show at the moment!
              </Typography>
            )}
            {/* </ScrollContent> */}
            {/* </ContainerWithScroll> */}
          </MuiBox>
        </MuiCard>
      </Box>
    </>
  );
}
