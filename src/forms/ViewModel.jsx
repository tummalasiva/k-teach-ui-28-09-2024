/** @format */

import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
// icons
import { Close } from "@mui/icons-material";

export default function ViewModel({ open, onClose, title, children }) {
  return (
    <>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
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
          <Close />
        </IconButton>
        <DialogContent
          sx={{
            padding: "10px",
          }}>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}
