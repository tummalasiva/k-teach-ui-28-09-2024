import { Box, Typography, styled, IconButton } from "@mui/material";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import CloseIcon from "@mui/icons-material/Close";

import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import themeData from "../../../data/themeData";

const style = {
  bgcolor: "background.paper",
  padding: "80px 30px 30px 30px",
};

const CloseButton = styled(Box)(() => ({
  background: themeData.darkPalette.primary.main,
  position: "absolute",
  top: "0px",
  right: "0px",
  height: "80px",
  width: "80px",
  borderBottomLeftRadius: 100,
}));

const CloseIconButton = styled(IconButton)(() => ({
  position: "absolute",
  top: "10px",
  right: "10px",
}));

const defaultPopupData = {
  title: "",
  link: "",
  document: "",
  image: "",
  text: "",
  contentType: "",
};

const SpalshNewsPopup = ({
  sharedData = defaultPopupData,
  open = false,
  handleClose = () => {},
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDownloadClick = (link) => {
    window.open(link, "_blank");
  };

  if (!open || window.location.pathname.startsWith("/sch")) return null;
  return (
    <>
      {sharedData?.contentType === "Link" && (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: { xs: "100%", sm: "450px", md: "450px", lg: "450px" },

                borderRadius: {
                  xs: "0px",
                  sm: "20px",
                  md: "20px",
                  lg: "20px",
                },
              },
            },
          }}
        >
          <CloseButton>
            <CloseIconButton onClick={handleClose}>
              <CloseIcon sx={{ color: "#fff" }} />
            </CloseIconButton>
          </CloseButton>
          <Box sx={style}>
            <Link style={{ alignSelf: "center" }} to={sharedData?.link}>
              Link : {sharedData?.link}
            </Link>
          </Box>
        </Dialog>
      )}

      {sharedData?.contentType === "Image" && (
        <>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: {
                    xs: "100%",
                    sm: "450px",
                    md: "450px",
                    lg: "450px",
                  },

                  borderRadius: {
                    xs: "0px",
                    sm: "20px",
                    md: "20px",
                    lg: "20px",
                  },
                },
              },
            }}
          >
            <CloseButton>
              <CloseIconButton onClick={handleClose}>
                <CloseIcon sx={{ color: "#fff" }} />
              </CloseIconButton>
            </CloseButton>
            <Box sx={style}>
              <img
                src={sharedData?.image}
                height={"auto"}
                width={"100%"}
                style={{
                  borderRadius: "10px",
                }}
              />
            </Box>
          </Dialog>
        </>
      )}

      {sharedData?.contentType === "Text" && (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: { xs: "100%", sm: "450px", md: "450px", lg: "450px" },

                borderRadius: {
                  xs: "0px",
                  sm: "20px",
                  md: "20px",
                  lg: "20px",
                },
              },
            },
          }}
        >
          <CloseButton>
            <CloseIconButton onClick={handleClose}>
              <CloseIcon sx={{ color: "#fff" }} />
            </CloseIconButton>
          </CloseButton>
          <Box sx={style}>
            <Typography
              sx={{ textAlign: "center", width: "100%" }}
              variant="body1"
            >
              {sharedData?.text}
            </Typography>
          </Box>
        </Dialog>
      )}

      {sharedData?.contentType === "Document" && (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: { xs: "100%", sm: "450px", md: "450px", lg: "450px" },

                borderRadius: {
                  xs: "0px",
                  sm: "20px",
                  md: "20px",
                  lg: "20px",
                },
              },
            },
          }}
        >
          <CloseButton>
            <CloseIconButton onClick={handleClose}>
              <CloseIcon sx={{ color: "#fff" }} />
            </CloseIconButton>
          </CloseButton>
          <Box sx={{ p: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <IconButton
                size="small"
                sx={{
                  alignSelf: "center",
                  width: "200px",
                  height: "45px",

                  ":hover": { backgroundColor: "white" },
                }}
                onClick={() => handleDownloadClick(sharedData?.document)}
              >
                Document
                <FileDownloadRoundedIcon />
              </IconButton>
            </Box>
          </Box>
        </Dialog>
      )}
    </>
  );
};

export default SpalshNewsPopup;
