/** @format */

import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useLayoutEffect,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { get } from "../../../services/apiMethods";
import { PRIVATE_URLS } from "../../../services/urlConstants";
import SettingContext from "../../../context/SettingsContext";

const MuiMainBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
});

const MuiMainCard = styled(Card)({
  background: "#fefefe",
  height: "100%",
});

const ImageBox = styled(Box)({
  position: "absolute",
  background: "#5d50c6",
  color: "white",
  bottom: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "5px",
});

const MuiText = styled(Typography)({
  display: "-webkit-box",
  overflow: "hidden",
  whiteSpace: "normal",
  "-webkit-box-orient": "vertical",
});

const SeeMore = ({ children }) => {
  const text = children;

  const [isSeeMore, setIsSeeMore] = useState(false);
  const containerRef = useRef();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (container) {
      const calculateHeight = () => {
        const computedStyle = window.getComputedStyle(container);
        const lineHeight = parseInt(computedStyle.lineHeight);
        const maxHeight = lineHeight;
        const actualHeight = container.clientHeight;
        setIsSeeMore(actualHeight > maxHeight);
      };

      calculateHeight();
    }
  }, [text, window.location.pathname]);

  return (
    <>
      <MuiText
        ref={containerRef}
        sx={{
          WebkitLineClamp: isSeeMore ? 2 : undefined,
          "-webkit-line-clamp": isSeeMore ? 2 : undefined,
        }}>
        {text}
      </MuiText>
      {isSeeMore && (
        <span
          style={{
            color: "#F86F03",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}>
          Read more
          <ChevronRightIcon />
        </span>
      )}
    </>
  );
};

const Recentactivities = () => {
  const { selectedSetting } = useContext(SettingContext);
  const [event, setEvent] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.event.listPublic, {
        params: { schoolId: selectedSetting._id },
      });
      setEvent(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedSetting._id]);

  const handleNavigate = (data) => {
    navigate(`/activity-details/${data._id}`, {
      state: { events: data },
    });
  };

  return (
    <>
      <MuiMainBox
        sx={{
          pt: 10,
          mb: 5,
        }}>
        <Typography
          sx={{ color: "#5d50c6", fontSize: "40px", fontWeight: 600 }}>
          Recent{" "}
          <span style={{ color: "#fda638", fontSize: "40px", fontWeight: 600 }}>
            Activities
          </span>
        </Typography>
        <Typography sx={{ mb: 2, mt: 1 }}>
          Below are the recent activities held in our school
        </Typography>
      </MuiMainBox>

      <Box px={{ xs: 2, md: 10 }} pb={10}>
        <Grid container spacing={2}>
          {event.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <MuiMainCard
                elevation={1}
                sx={{
                  maxWidth: 345,
                }}
                onClick={() => handleNavigate(data)}>
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    src={data.image}
                    alt="green iguana"
                    sx={{ height: 300 }}
                  />

                  <ImageBox>
                    <Typography>{dayjs(data.toDate).format("DD")}</Typography>
                    <Typography>{dayjs(data.toDate).format("MMMM")}</Typography>
                    <Typography>{dayjs(data.toDate).format("YYYY")}</Typography>
                  </ImageBox>
                </Box>

                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      color: "#000",
                      ":hover": { color: "#1eaaf1" },
                      cursor: "pointer",
                    }}
                    onClick={() => handleNavigate(data)}>
                    {data.title}
                  </Typography>
                  <SeeMore data={data}>{data.shortEvent}</SeeMore>
                </CardContent>
              </MuiMainCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Recentactivities;
