/** @format */

import React, { useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";

export default function LetterViewModal({
  open,
  content,
  onClose,
  onPrintClick,
  title,
}) {
  const contentRef = useRef(null);

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}>
      <DialogTitle
        sx={{ m: 0, p: 2, fontWeight: 600 }}
        id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}>
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Typography gutterBottom>
          <div
            class="printContainer"
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: content }}></div>
        </Typography>
      </DialogContent>
      <DialogActions>
        <ReactToPrint
          trigger={() => (
            <Button
              variant="contained"
              size="small"
              sx={{
                background: "#1b3779",
                ":hover": { background: "#1b3779" },
              }}
              onClick={onPrintClick}
              startIcon={<PrintIcon />}>
              Print
            </Button>
          )}
          content={() => contentRef.current}
        />
      </DialogActions>
    </Dialog>
  );
}
