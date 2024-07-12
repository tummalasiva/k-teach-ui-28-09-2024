/** @format */

import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import styled from "@emotion/styled";
import FileListModal from "./FileListModal";
// icons
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

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
  previousFile = "",
  ...rest
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleModalClose = () => setOpen(false);

  return (
    <>
      <Wrapper mt={1}>
        <Box
          component="div"
          onClick={() => setOpen(true)}
          sx={{
            borderRadius: "5px",
            padding: "8px",
            backgroundColor: "white",
            border: "1px solid lightgray",
            height: "30px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}>
          <Typography
            component="div"
            onClick={() => setOpen(true)}
            sx={{
              fontWeight: "bold",
              borderRadius: "5px",
              padding: "5px",
              backgroundColor: "white",
              color: "black",
              height: "30px",
              width: "30px",
              textAlign: "center",
            }}>
            {selectedFiles.length}
          </Typography>

          <RemoveRedEyeRoundedIcon fontSize="14px" />
        </Box>

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
        {previousFile && (
          <Tooltip title="Uploaded File Link">
            <IconButton
              component="div"
              size="small"
              color="primary"
              variant="outlined"
              onClick={() => window.open(previousFile, "_blank")}>
              <DownloadForOfflineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
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
