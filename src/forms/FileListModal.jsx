import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";

export default function FileListModal({
  open = false,
  onClose = () => {},
  styles = {},
  selectedFiles = [],
  setSelectFiles = () => {},
  customOnChage = false,
  onRemove = () => {},
}) {
  const theme = useTheme();
  let fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRemoveImage = (fileName) => {
    setSelectFiles(selectedFiles.filter((f) => f.name !== fileName));
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 650,
          ...styles,
        },
      }}
    >
      <DialogTitle>Selected files</DialogTitle>
      <Divider />
      <DialogContent
        sx={{
          padding: "10px",
        }}
      >
        {selectedFiles.map((f, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>{f.name}</Typography>{" "}
            <IconButton
              size="small"
              onClick={
                customOnChage
                  ? () => onRemove(f.name)
                  : () => handleRemoveImage(f.name)
              }
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} size="small" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
