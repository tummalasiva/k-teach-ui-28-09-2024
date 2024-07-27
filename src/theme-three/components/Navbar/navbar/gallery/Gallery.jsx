/** @format */

import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Carousel from "react-slick";
import { Backdrop, Box, CardMedia, Modal, Typography } from "@mui/material";
import GallerySubHome from "./GallerySubHome";
import CloseIcon from "@mui/icons-material/Close";
import SettingContext from "../../../../../context/SettingsContext";
import { PRIVATE_URLS } from "../../../../../services/urlConstants";
import { get } from "../../../../../services/apiMethods";
import SubHeader from "../../../../../theme-one/components/SubHeader";

const TypographyMain = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: "25px",
  fontSize: "40px",
  color: "#f86f03",
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
  height: "auto",
  background: "#fff",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
}));

const GridBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "300px 300px 300px 300px",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "70px",
  marginLeft: "20px",
  marginRight: "20px",
  [theme.breakpoints.down(1000)]: {
    gridTemplateColumns: "300px 300px  ",
  },
  [theme.breakpoints.down(660)]: {
    gridTemplateColumns: "300px   ",
  },
  [theme.breakpoints.down(400)]: {
    gridTemplateColumns: "300px   ",
  },
}));

const TextBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
}));

const Heading = styled(Typography)(({ theme }) => ({
  marginTop: "2rem",
  color: "#FF6D34",
  fontSize: "1rem",
  fontFamily: "sans-serif",
  fontWeight: "bold",
}));

const List = styled("ul")(({ theme }) => ({
  display: "flex",
  gap: "2rem",
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: "1.5rem",
  listStyle: "none",
}));

const ListItem = styled("li")(({ theme }) => ({
  fontFamily: "sans-serif",
  fontWeight: "bold",
  fontSize: "0.9rem",
  color: "#2c2c2c",
  transition: "all 0.5s",
  cursor: "pointer",
  "&:hover": {
    color: "#ff4500",
  },
}));

export default function Gallery() {
  const [selectedFilter, setSelectedFilter] = React.useState("All");

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { selectedSetting } = React.useContext(SettingContext);

  const [galleryData, setGalleryData] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("ALL");
  const [filteredGalleryData, setFilteredGalleryData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

  const [modalOpen, setModalOpen] = React.useState({
    open: false,
    imageData: [],
    viewSingleImg: {},
  });

  React.useEffect(() => {
    if (selectedFilter === "All") {
      setFilteredData(galleryData);
    } else {
      setFilteredData(galleryData.filter((d) => d.title == selectedFilter));
    }
  }, [selectedFilter]);

  const getGalleryData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.gallery.listPublic, {
        params: { schoolId: selectedSetting._id },
      });

      setGalleryData(data.result);
      setItems(data.result);

      setFilteredData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getGalleryData();
  }, []);

  React.useEffect(() => {
    if (selectedCategory === "ALL") {
      setFilteredGalleryData(items);
    } else {
      const filteredData = items.filter(
        (item) => item.title === selectedCategory
      );
      setFilteredGalleryData(filteredData);
    }
  }, [selectedCategory, items]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  let handleData = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <>
      <SubHeader
        title="Gallery"
        leftSideHeader="HOME"
        rightSideHeader="Gallery"
      />

      <TextBox>
        <Heading>DISCOVER NEW</Heading>
        <TypographyMain>Our Gallery</TypographyMain>
      </TextBox>

      <Box>
        <List>
          <ListItem
            onClick={() => handleData("All")}
            style={{ borderLeft: "3px solid #ff4500", paddingLeft: "0.5rem" }}>
            ALL
          </ListItem>
          {[...galleryData.map((d) => d.title)].map((data, i) => {
            return (
              <React.Fragment key={i}>
                <ListItem
                  key={i}
                  onClick={() => handleCategoryClick(data.title)}>
                  {data.title}
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </Box>

      <GridBox>
        {filteredGalleryData.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <GallerySubHome data={item} setModalOpen={setModalOpen} />
            </React.Fragment>
          );
        })}
      </GridBox>

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
        <ModalBox
          sx={{
            width: { xs: "100%", sm: "100%", md: 650 },
          }}>
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
            {modalOpen?.imageData?.map((image, index) => (
              <CardMedia
                key={index}
                component="img"
                image={image}
                alt="loading..."
                height="560"
                sx={{
                  borderRadius: "5px",
                  objectFit: "contain",
                  px: "15px",
                }}
              />
            ))}
          </Carousel>
        </ModalBox>
      </Modal>
    </>
  );
}
