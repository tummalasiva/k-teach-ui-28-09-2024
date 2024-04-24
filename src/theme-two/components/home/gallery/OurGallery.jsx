import React, { useRef } from "react";
import Slider from "react-slick";
import {
  Container,
  Box,
  Typography,
  styled,
  Modal,
  Backdrop,
  CardMedia,
  IconButton,
} from "@mui/material";
import image from "../../../assets/images/school-white.avif";
import image1 from "../../../assets/images/school2.jpg";
import image2 from "../../../assets/images/school-green.avif";
import image3 from "../../../assets/images/school1.avif";
import image4 from "../../../assets/images/redImg.png.png";
import Gallery from "./Gallery";
import themeData from "../../../../data/themeData";
import { settings } from "../../../data/Carousal";
// icons
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Close } from "@mui/icons-material";

const TextBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  // marginTop: "20px",
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
  [theme.breakpoints.down("md")]: {
    // textAlign:"center",
    // margin:0,
    // padding:"25px"
  },
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

const galleryData = [
  {
    title: "Learning Management System",
    content:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum corrupti unde dolor aliquam commodi cum aut magnam a cumque, veritatis repellat facere eos tempora quas! Esse quas praesentium numquam minus dicta",
    images: [image, image1, image2, image3, image4],
  },
  {
    title: "Marketing and Management ",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, voluptate.",
    images: [image, image1, image2, image3, image4],
  },
  {
    title: "Marketing and Management ",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, voluptate.",
    images: [image, image1, image2, image3, image4],
  },
  {
    title: "Marketing and Management ",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, voluptate.",
    images: [image, image1, image2, image3, image4],
  },
];

export default function OurGallery() {
  const [modalOpen, setModalOpen] = React.useState({
    open: false,
    img: [],
    singleImg: {},
  });

  const selectedIndex = modalOpen.img.findIndex(
    (image) => image._id === modalOpen.singleImg._id
  );

  const reorderedImages = [
    modalOpen.singleImg,
    ...modalOpen.img.slice(0, selectedIndex),
    ...modalOpen.img.slice(selectedIndex + 1),
  ];

  let sliderRef = useRef(null);

  return (
    <>
      <TextBox>
        <Heading>DISCOVER NEW</Heading>
        <TypographyMain>OUR GALLERY</TypographyMain>
      </TextBox>

      <Main>
        <Container style={{ padding: "10px" }}>
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
                  image={image?.link}
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
