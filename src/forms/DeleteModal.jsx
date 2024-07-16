/** @format */

import React, { useState } from "react";
import image from "../assets/images/deleteicon.png";
import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
};
export default function DeleteModal(props) {
  return (
    <>
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={props.deleteModal}
        onClose={() => props.setDeleteModal(false)}>
        <Box sx={style}>
          <Box sx={{ textAlign: "center", margin: "10px auto" }}>
            <img src={image} width={50} height={50} />
          </Box>

          <Typography
            textAlign="center"
            sx={{ fontSize: "18px", fontWeight: 700 }}>
            Delete Confirmation
          </Typography>
          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Are you sure want to delete this item?
          </Typography>
          <Box
            my={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
            }}>
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={() => props.setDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                props.handleDelete(props.id);
                props.setDeleteModal(false);
              }}
              color="primary"
              size="small"
              variant="contained">
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
