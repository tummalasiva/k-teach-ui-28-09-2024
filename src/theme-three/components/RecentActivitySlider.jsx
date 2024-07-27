/** @format */

import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Modal,
  Fade,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import InstagramIcon from "@mui/icons-material/Instagram";
import SettingContext from "../../context/SettingsContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";

const CustomSlider = ({ items, selectedIndex, onPrev, onNext, onClose }) => {
  return (
    <Box
      sx={{
        position: "relative",

        overflow: "hidden",
      }}>
      <IconButton
        onClick={onClose}
        size="large"
        sx={{
          position: "absolute",

          top: { xs: 0, sm: "2%", lg: "2%", md: "2%" },
          right: "1%",

          color: "#fff",

          zIndex: 1,
        }}>
        <CloseIcon fontSize="large" />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          transition: "transform 0.5s ease",
          transform: `translateX(-${selectedIndex * 100}%)`,
        }}>
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              flex: "0 0 100%",
              maxWidth: "100%",
              backgroundColor: "#000",
            }}>
            <img
              src={item}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "100vh", objectFit: "contain" }}
            />
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={onPrev}
        size="large"
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          color: "#fff",
          zIndex: 2,
        }}>
        <ArrowLeftIcon sx={{ fontSize: "80px" }} />
      </IconButton>

      <IconButton
        onClick={onNext}
        size="large"
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          color: "#fff",
          zIndex: 2,
        }}>
        <ArrowRightIcon sx={{ fontSize: "80px" }} />
      </IconButton>
    </Box>
  );
};

const RecentActivitySlider = () => {
  const { selectedSetting } = useContext(SettingContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const handleInstagramIconClick = (galleryIndex) => {
    setSelectedGalleryIndex(galleryIndex);
    setSelectedImageIndex(0);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleMouseEnter = (index) => {
    setHoveredImage(index);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) => {
      const newIndex =
        (prevIndex - 1 + galleries[selectedGalleryIndex].images.length) %
        galleries[selectedGalleryIndex].images.length;
      return newIndex !== galleries[selectedGalleryIndex].images.length - 1
        ? newIndex
        : 0;
    });
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => {
      const newIndex =
        (prevIndex + 1) % galleries[selectedGalleryIndex].images.length;
      return newIndex !== 0
        ? newIndex
        : galleries[selectedGalleryIndex].images.length - 1;
    });
  };

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.gallery.listPublic, {
        params: { schoolId: selectedSetting._id },
      });

      setGalleries(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedSetting]);

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container sx={{ mt: 4 }}>
        {galleries.slice(0, 4).map((gallery, index) => (
          <Grid item key={index} xs={12} sm={6} md={6} lg={3}>
            <Card
              sx={{ borderRadius: 0 }}
              onClick={() => handleInstagramIconClick(index)}>
              <CardActionArea
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}>
                <Box sx={{ position: "relative" }} key={index}>
                  <CardMedia
                    component="img"
                    height="300"
                    sx={{
                      objectFit: "cover",

                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    src={gallery.images[0]}
                    alt={`Image ${index + 1}`}
                  />
                  {hoveredImage === index && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        backgroundColor: "#1eaaf1",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        padding: "10px",
                        transform: "translate(-50%, -50%)",
                      }}>
                      <InstagramIcon fontSize="small" />
                    </Box>
                  )}
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Fade in={modalOpen}>
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {selectedGalleryIndex !== null && (
              <CustomSlider
                items={galleries[selectedGalleryIndex].images.map(
                  (data) => data
                )}
                selectedIndex={selectedImageIndex}
                onPrev={handlePrev}
                onNext={handleNext}
                onClose={handleCloseModal}
              />
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default RecentActivitySlider;
