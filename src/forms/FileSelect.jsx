import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import styled from "@emotion/styled";
import FileListModal from "./FileListModal";

const Wrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  columnGap: "5px",
}));

export default function FileSelect({
  name,
  multi = true,
  label = "default label",
  required = false,
  onChange = () => {},
  value,
  selectedFiles = [],
  disabled = false,
  setSelectedFiles = () => {},
  customOnChange = false,
  onRemove = () => {},
  ...rest
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleModalClose = () => setOpen(false);

  return (
    <>
      <Wrapper mt={1}>
        <Typography
          component="div"
          onClick={() => setOpen(true)}
          sx={{
            fontWeight: "bold",
            borderRadius: "5px",
            padding: "5px",
            backgroundColor: "white",
            border: "1px solid lightgray",
            color: "black",
            height: "30px",
            width: "30px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          {selectedFiles.length}
        </Typography>
        <Button fullWidth component="label" size="small" variant="outlined">
          <input
            type="file"
            multiple={multi}
            // style={{ visibility: "hidden" }}
            hidden
            onChange={
              customOnChange
                ? (e) => onChange(e)
                : (e) => {
                    const selectedFiles = e.target.files;

                    if (selectedFiles.length > 0) {
                      let fileList = [];
                      for (let i = 0; i < selectedFiles.length; i++) {
                        const file = selectedFiles[i];

                        fileList.push(file);
                      }
                      setSelectedFiles([...fileList]);
                    } else {
                      console.log("No files selected");
                    }
                  }
            }
          />
          Select files
        </Button>
      </Wrapper>
      <FileListModal
        open={open}
        selectedFiles={selectedFiles}
        setSelectFiles={setSelectedFiles}
        onClose={handleModalClose}
        customOnChage={customOnChange}
        onRemove={onRemove}
      />
    </>
  );
}

// import { Box, Button } from "@mui/material";
// import React, { useState } from "react";

// const FileSelect = ({ onSelect, imageUrl }) => {
//   const [imagePreview, setImagePreview] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     onSelect(file);
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <>
//       <Button fullWidth component="label" size="small" variant="outlined">
//         <input
//           type="file"
//           hidden
//           accept="image/*"
//           onChange={handleFileChange}
//         />
//         Select Image
//       </Button>
//       {imageUrl ? (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <img
//             src={imageUrl}
//             alt="Preview"
//             style={{ maxWidth: "100px", marginTop: "2px" }}
//           />
//         </Box>
//       ) : (
//         imagePreview && (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <img
//               src={imagePreview}
//               alt="Preview"
//               style={{ maxWidth: "100px", marginTop: "2px" }}
//             />
//           </Box>
//         )
//       )}
//     </>
//   );
// };

// export default FileSelect;
