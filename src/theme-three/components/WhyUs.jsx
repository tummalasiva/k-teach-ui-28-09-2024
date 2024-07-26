/** @format */

import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EventIcon from "@mui/icons-material/Event";
import iconSe from "../assets/images/Icons/iconSe.png";
import icon3w from "../assets/images/Icons/icon3w.png";
import icon8w from "../assets/images/Icons/icon8w.png";
import iconT from "../assets/images/Icons/iconT.png";
import iconX from "../assets/images/Icons/iconX.png";
import iconP from "../assets/images/Icons/iconP.png";
import SettingContext from "../../context/SettingsContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";

const Text = styled(Typography)(({ theme }) => ({
  marginBottom: "20px",
  fontSize: "32px",
  fontWeight: 500,
  fontFamily: "Work Sans , Arial, sans-serif",
}));

const NewsContainer = styled(Box)(({ theme }) => ({
  height: "400px",
  overflow: "hidden",
}));

const ScrollContainer = styled(Box)(({ theme }) => ({}));

const TextSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: "20px",
  color: "#00000080",
  fontSize: "16px",
  lineHeight: 1.8,
  fontFamily: "Work Sans , Arial, sans-serif",
}));

const DATAS = [
  {
    icons: "",
    iconText: "Student Saftey",
    img: iconSe,
  },
  {
    icons: "",
    iconText: "Cultural Activities",
    img: icon3w,
  },
  {
    icons: "",
    iconText: "Experienced Teachers",
    img: icon8w,
  },
  {
    icons: "",
    iconText: "Sufficient Classrooms",
    img: iconT,
  },
  {
    icons: "",
    iconText: "Creative Lessons",
    img: iconX,
  },
  {
    icons: "",
    iconText: "Sports Facilities",
    img: iconP,
  },
];

export default function WhyUs() {
  const [event, setEvent] = useState([]);
  const { selectedSetting } = React.useContext(SettingContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const getItem = await get(PRIVATE_URLS.news.listPublic, {
          params: { schoolId: selectedSetting._id },
        });

        const getItem2 = await get(PRIVATE_URLS.notice.listPublic, {
          params: { schoolId: selectedSetting._id },
        });

        setEvent([...getItem2.data.result, ...getItem.data.result]);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={7} px={{ xs: 2, md: 10 }} py={7}>
          <Text variant="h2">Why Diamond View International School?</Text>
          <TextSubtitle variant="subtitle1">
            Diamond View International School is a premier educational
            institution located in Ramanagar. We are committed to providing a
            world-class education to our students, from kindergarten through
            high school.
          </TextSubtitle>
          <Grid container spacing={4}>
            {DATAS.map((items, i) => (
              <Grid item xs={12} sm={12} md={6} key={i}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  key={i}>
                  <Box
                    sx={{
                      background: "#1eaaf1",
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <img
                      src={items.img}
                      alt="Loading..."
                      height={45}
                      width={45}
                    />
                  </Box>
                  {/* </Box> */}
                  <Box>
                    <Typography variant="h6">{items.iconText}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4.2}
          py={7}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
            bgcolor: "whitesmoke",
          }}>
          <Grid item xs={12} sm={12} md={12} px={{ xs: 2, md: 4 }}>
            <Text variant="h5">News & Notices</Text>
            <NewsContainer>
              <ScrollContainer>
                {event.map((data, index) => (
                  <List key={index}>
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <EventIcon size="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{
                          color: "primary",
                        }}
                        primary={data.title}
                      />
                    </ListItem>
                  </List>
                ))}
              </ScrollContainer>
            </NewsContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
