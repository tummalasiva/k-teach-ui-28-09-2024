import { Box, Button } from "@mui/material";
import React, { useState } from "react";

const FileSelect = ({ onSelect, imageUrl }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onSelect(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Button fullWidth component="label" size="small" variant="outlined">
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
        Select Image
      </Button>
      {imageUrl ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={imageUrl}
            alt="Preview"
            style={{ maxWidth: "100px", marginTop: "2px" }}
          />
        </Box>
      ) : (
        imagePreview && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "100px", marginTop: "2px" }}
            />
          </Box>
        )
      )}
    </>
  );
};

export default FileSelect;
