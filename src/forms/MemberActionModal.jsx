/** @format */

import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function MemberActionModal(props) {
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle sx={{ fontWeight: 600 }}>{props.actionTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.descriptions}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ m: 1 }}>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={props.handleClose}>
            cancel
          </Button>
          <LoadingButton
            loading={props.loading}
            onClick={props.handleSubmitModal}
            color="primary"
            size="small"
            variant="contained">
            Yes, I'm sure
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
