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
  accept = "",
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
            accept={accept}
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
          {label}
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
