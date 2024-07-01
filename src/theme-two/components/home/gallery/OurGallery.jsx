/** @format */

import React, { useRef, useState, useEffect, useContext } from "react";
import {
  Container,
  Box,
  Typography,
  styled,
  Modal,
  Backdrop,
  IconButton,
  CardMedia,
} from "@mui/material";
import Gallery from "./Gallery";
import { settings } from "../../../data/Carousal";
import { get } from "../../../../services/apiMethods";
import { PRIVATE_URLS } from "../../../../services/urlConstants";
import SettingContext from "../../../../context/SettingsContext";
import Dots from "../../../data/Dots";
import themeData from "../../../../data/themeData";
import { Close } from "@mui/icons-material";
import Slider from "react-slick";

const TextBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
}));

const Heading = styled(Typography)(({ theme }) => ({
  marginTop: "4rem",
  color: themeData.darkPalette.secondary.main,
  fontSize: "1rem",
  fontFamily: "sans-serif",
  fontWeight: "bold",
}));

const TypographyMain = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: "25px",
  fontSize: "40px",
  color: themeData.darkPalette.primary.main,
  fontWeight: "bold",
  textShadow: "10px 8px 8px #969c96",
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    margin: 0,
    padding: "0",
  },
}));

const TextBox1 = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
}));

const Main = styled(Box)(({ theme }) => ({
  marginTop: "4rem",
  marginBottom: "5rem",
}));

const ImagBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  height: "auto",
  background: "#fff",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
}));

export default function OurGallery() {
  let sliderRef = useRef(null);
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState({
    open: false,
    img: [],
    singleImg: {},
  });

  const selectedIndex = modalOpen.img.findIndex(
    (image) => image._id === modalOpen.singleImg._id
  );

  const reorderedImages = [
    ...modalOpen.img.slice(selectedIndex),
    ...modalOpen.img.slice(0, selectedIndex),
  ];

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.gallery.listPublic, {
        params: { schoolId: selectedSetting._id },
      });

      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedSetting]);

  return (
    <>
      <TextBox>
        <Heading>DISCOVER NEW</Heading>
        <TypographyMain>OUR GALLERY</TypographyMain>
        <Dots />
      </TextBox>
      <Main>
        <Box sx={{ paddingLeft: "4rem", paddingRight: "4rem" }}>
          <Gallery
            ref={sliderRef}
            galleryData={data}
            setModalOpen={setModalOpen}
          />
        </Box>
        {/* == show gallery img model =======  */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modalOpen.open}
          onClose={() => setModalOpen({ open: false, img: [], singleImg: {} })}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}>
          <ImagBox>
            <IconButton
              aria-label="close"
              onClick={() =>
                setModalOpen({ open: false, img: [], singleImg: {} })
              }
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                zIndex: 9,
              }}>
              <Close />
            </IconButton>
            <Slider {...settings}>
              {reorderedImages.map((image, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  image={image}
                  alt="loading..."
                  sx={{
                    borderRadius: "5px",
                    objectFit: "contain",
                    p: "15px",
                    height: "600px",
                  }}
                />
              ))}
            </Slider>
          </ImagBox>
        </Modal>
      </Main>
    </>
  );
}
