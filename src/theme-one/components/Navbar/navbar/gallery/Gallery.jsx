/** @format */

import React, { useContext, useEffect, useState } from "react";
import SubHeader from "../../../SubHeader";
import GallerySubHome from "./GallerySubHome";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Carousel from "react-slick";
import { Backdrop, Box, CardMedia, Modal, Typography } from "@mui/material";
// icons
import CloseIcon from "@mui/icons-material/Close";
import themeData from "../../../../../data/themeData";
import SettingContext from "../../../../../context/SettingsContext";
import { PRIVATE_URLS } from "../../../../../services/urlConstants";
import { get } from "../../../../../services/apiMethods";

const TypographyMain = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: "25px",
  fontSize: "40px",
  color: themeData.darkPalette.primary.main,
  fontWeight: "bold",
  textShadow: "10px 8px 8px #969c96",

  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    margin: 0,
    padding: "0",
  },
}));

const ModalBox = styled(Box)(({ theme }) => ({
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

const GridBox = styled(Box)(({ theme }) => ({
  display: "grid",
  paddingBottom: "30px",
  gridTemplateColumns: "300px 300px 300px 300px",
  justifyContent: "space-evenly",
  gap: "15px",
  [theme.breakpoints.down(1000)]: {
    gridTemplateColumns: "300px 300px  ",
  },
  [theme.breakpoints.down(660)]: {
    gridTemplateColumns: "400px   ",
  },
  [theme.breakpoints.down(400)]: {
    gridTemplateColumns: "300px   ",
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  marginTop: "2rem",
  textAlign: "center",
  color: themeData.darkPalette.primary.main,
  fontSize: "1rem",
  fontFamily: "sans-serif",
  fontWeight: "bold",
  paddingTop: "20px",
}));

const TextBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: "15px 0px",
}));

const Text = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "18px",
  borderLeft: `3px solid ${themeData.darkPalette.primary.main}`,
  paddingLeft: "0.5rem",
}));

const MuiMainBox = styled(Box)(({}) => ({
  background: "#fff",
  borderRadius: "8px",
}));

export default function Gallery({ show }) {
  const { selectedSetting } = useContext(SettingContext);
  const [galleryData, setGalleryData] = useState([]);
  const [modalOpen, setModalOpen] = React.useState({
    open: false,
    imageData: [],
    viewSingleImg: {},
  });

  const SelectedImageIndex = modalOpen?.imageData?.findIndex(
    (img) => img._id === modalOpen.viewSingleImg._id
  );

  const cutailImages = [
    ...modalOpen?.imageData?.slice(0, SelectedImageIndex),
    ...modalOpen?.imageData?.slice(SelectedImageIndex + 1),
  ];

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.gallery.listPublic, {
        params: { schoolId: selectedSetting._id },
      });

      setGalleryData(data.result);

      console.log(data.result, "ggggfgffgffff");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedSetting]);

  return (
    <>
      <SubHeader
        show={show}
        title="Gallery"
        leftSideHeader="Home"
        rightSideHeader="Gallery"
      />
      <MuiMainBox>
        <Heading>DISCOVER NEW</Heading>
        <TypographyMain>Our Gallery</TypographyMain>
        <TextBox>
          <Text>ALL</Text>
        </TextBox>

        <GridBox>
          {galleryData.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <GallerySubHome data={item} setModalOpen={setModalOpen} />
              </React.Fragment>
            );
          })}
        </GridBox>
      </MuiMainBox>

      {/* ======== View Gallery img ======= */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen.open}
        onClose={() =>
          setModalOpen({ open: false, imageData: [], viewSingleImg: {} })
        }
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <ModalBox>
          <IconButton
            aria-label="close"
            onClick={() =>
              setModalOpen({ open: false, imageData: [], viewSingleImg: {} })
            }
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              zIndex: 9,
            }}>
            <CloseIcon />
          </IconButton>
          <Carousel>
            {cutailImages?.map((image, index) => (
              <CardMedia
                key={index}
                component="img"
                image={image}
                alt="loading..."
                height="460"
                sx={{
                  borderRadius: "5px",
                  objectFit: "contain",
                  px: "15px",
                }}
                loading={true}
              />
            ))}
          </Carousel>
        </ModalBox>
      </Modal>
    </>
  );
}
