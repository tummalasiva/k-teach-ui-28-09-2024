/** @format */

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";

import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { useNavigate } from "react-router-dom";

import img from "../../assets/images/enroll.png";

import PageHeader from "../../components/PageHeader";

const Title = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  fontSize: "1rem",
  fontWeight: "bold",
  marginTop: "2%",
  color: theme.palette.primary.main,
  display: "-webkit-box",
  margin: "2px 0",
  WebkitLineClamp: 1,
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
}));
const Name = styled(Box)(() => ({
  fontWeight: 550,
  fontSize: "13px",
}));
const Time = styled(Box)(() => ({
  position: "absolute",
  top: "2%",
  right: "5%",
  backgroundColor: "white",

  border: "1px solid white",
  borderRadius: "2px",
  display: "flex",
  fontSize: "13px",
  gap: "5px",
  alignItems: "center",
}));
const NoCourse = styled(Box)((theme) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "40%",
  },
  margin: "150px auto",
  textAlign: "center",
  color: "gray",
  border: "2px solid gray",
  padding: "30px",
}));

export default function Courses() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };

  const [courseList] = useState([
    {
      _id: "1",
      title: "Course 1",
      description: "Description of Course 1",
      thumbnailImage: img,
      courseHours: "10",
    },
    {
      _id: "2",
      title: "Course 2",
      description: "Description of Course 2",
      thumbnailImage: img,
      courseHours: "15",
    },
    {
      _id: "3",
      title: "Course 3",
      description: "Description of Course 3",
      thumbnailImage: img,
      courseHours: "8",
    },
  ]);
  return (
    <>
      <PageHeader title="Courses" />
      <Container maxWidth="xl" sx={{ marginTop: "5px" }}>
        {courseList && courseList.length > 0 ? (
          <Grid container spacing={2}>
            {courseList.map((data, i) => (
              <Grid item xs={12} sm={6} md={4} key={data._id}>
                <Card
                  sx={{ boxShadow: "10", height: "100%", borderRadius: "5px" }}>
                  <CardActionArea onClick={() => handleNavigate(data._id)}>
                    <CardMedia
                      component="img"
                      style={{ height: "180px" }}
                      image={data?.thumbnailImage ? data?.thumbnailImage : ""}
                      alt="green iguana"
                    />

                    <CardContent sx={{ padding: "10px 10px" }}>
                      <Time>
                        <AccessTimeRoundedIcon sx={{ fontSize: "medium" }} />
                        <Typography
                          variant="body1"
                          component="div"
                          textAlign="center">
                          {data?.courseHours ? data?.courseHours : "0 hrs"}hrs
                        </Typography>
                      </Time>

                      <Title variant="h6">{data.title}</Title>
                      <Name>{data.description}</Name>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            <NoCourse>
              <Typography variant="h6">
                You don't have any COURSE in your account!
              </Typography>
              <Button
                onClick={() => navigate("/allcourse")}
                variant="contained"
                size="small"
                sx={{
                  marginTop: "30px",
                }}>
                Explore
              </Button>
            </NoCourse>
          </Grid>
        )}
      </Container>
    </>
  );
}
