/** @format */

import React, { useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import {
  Container,
  Box,
  styled,
  Modal,
  Backdrop,
  CardMedia,
  IconButton,
} from "@mui/material";
import { settings } from "../data/carousal";
import { Close } from "@mui/icons-material";
import Gallery from "./Gallery";

import Header from "../Header";
import { get } from "../../../services/apiMethods";
import { PRIVATE_URLS } from "../../../services/urlConstants";
import SettingContext from "../../../context/SettingsContext";

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

const OurGallery = () => {
  const [modalOpen, setModalOpen] = React.useState({
    open: false,
    img: [],
    singleImg: {},
  });

  let sliderRef = useRef(null);

  const { selectedSetting } = useContext(SettingContext);

  const [data, setData] = useState([]);
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
      <Main>
        <Header title1="Our" title2="Gallery" />

        {data.length >= 1 && (
          <Container sx={{ padding: "10px" }}>
            <Gallery
              ref={sliderRef}
              galleryData={data}
              setModalOpen={setModalOpen}
            />
          </Container>
        )}
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
              {modalOpen.img?.map((image, index) => (
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
};

export default OurGallery;
