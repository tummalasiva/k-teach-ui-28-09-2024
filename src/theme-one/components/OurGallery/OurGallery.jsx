import React, { useRef } from "react";
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
import image from "../../../theme-one/assets/Images/image1.png";
import image1 from "../../../theme-one/assets/Images/school1.avif";
import image2 from "../../../theme-one/assets/Images/school-white.avif";
import image3 from "../../../theme-one/assets/Images/school-green.avif";
import image4 from "../../../theme-one/assets/Images/school1.avif";
import Header from "../Header";

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

const galleryData = [
  {
    id: 1,
    title: "Learning Management System",
    content:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum corrupti unde dolor aliquam commodi cum aut magnam a cumque, veritatis repellat facere eos tempora quas! Esse quas praesentium numquam minus dicta",
    images: [image, image1, image2, image3, image4],
  },
  {
    id: 2,
    title: "Marketing and Management ",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, voluptate.",
    images: [image, image1, image2, image3, image4],
  },
  {
    id: 3,
    title: "Marketing and Management ",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, voluptate.",
    images: [image, image1, image2, image3, image4],
  },
  {
    id: 4,
    title: "Marketing and Management ",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, voluptate.",
    images: [image, image1, image2, image3, image4],
  },
];

const OurGallery = () => {
  const [modalOpen, setModalOpen] = React.useState({
    open: false,
    img: [],
    singleImg: {},
  });

  const selectedIndex = modalOpen.img.findIndex(
    (image) => image._id === modalOpen.singleImg._id
  );

  const reorderedImages = [
    ...modalOpen.img.slice(0, selectedIndex),
    ...modalOpen.img.slice(selectedIndex + 1),
  ];

  let sliderRef = useRef(null);

  return (
    <>
      <Main>
        <Header title1="Our" title2="Gallery" />

        <Container sx={{ padding: "10px" }}>
          <Gallery
            ref={sliderRef}
            galleryData={galleryData}
            setModalOpen={setModalOpen}
          />
        </Container>
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
          }}
        >
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
              }}
            >
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
};

export default OurGallery;
