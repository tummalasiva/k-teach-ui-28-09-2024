import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import themeData from "../data/themeData";
import WebsiteThemeContext from "../context/WebsiteThemeContext";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ThemeSelector() {
  const { setSelectedTheme: setTheme } = React.useContext(WebsiteThemeContext);
  const [open, setOpen] = React.useState(false);
  const [selectedTheme, setSelectedTheme] = React.useState(
    window.localStorage.getItem("selectedTheme") || 1
  );

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateTheme = () => {
    setTheme(selectedTheme);
    window.localStorage.setItem("selectedTheme", selectedTheme);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button size="small" variant="contained" onClick={handleClickOpen}>
        Select Theme
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Select your Favorite Theme
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid spacing={2} container>
            {themeData.websiteThemes.map((t) => (
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div onClick={() => setSelectedTheme(t.theme)}>
                  <img
                    style={{
                      height: "150px",
                      width: "200px",
                      objectFit: "contain",
                      border:
                        parseInt(selectedTheme) === t.theme
                          ? "2px solid green"
                          : "2px solid lightgray",
                      borderRadius: "5px",
                      overflow: "hidden",
                    }}
                    src={t.image}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleUpdateTheme}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
