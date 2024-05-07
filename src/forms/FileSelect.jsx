import { Box } from "@mui/material";
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
    <Box mt={3} sx={{ display: "flex" }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imageUrl ? (
        <Box>
          <img src={imageUrl} alt="Preview" style={{ maxWidth: "100px" }} />
        </Box>
      ) : (
        imagePreview && (
          <Box>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "100px" }}
            />
          </Box>
        )
      )}
    </Box>
  );
};

export default FileSelect;
