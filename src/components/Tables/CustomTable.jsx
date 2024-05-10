import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NoTableData from "./NoTableData";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import { PuffLoader } from "react-spinners";
import image from "../../assets/images/deleteicon.png";

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

const getDataValue = (data, k) => {
  if (typeof data[k.key] === "boolean") {
    return data[k.key] === true ? "Yes" : "No";
  }
  if (k.path) {
    if (Object.keys(data[k.path] || {}).length > 0) {
      return data[k.path][k.key] || "NA";
    }
  }

  if (k.isDate) {
    return data[k.key] ? new Date(data[k.key]).toDateString() : "NA";
  } else {
    return data[k.key] || "NA";
  }
};

export default function CustomTable({
  bodyData = [],
  bodyDataModal = "",
  tableKeys = [],
  actions = ["edit", "delete", "view", "view", "card", "switch"],
  onEditClick = () => {},
  onDeleteClick = () => {},
  onViewClick = () => {},
  onCardClick = () => {},
  onUnBundleClick = () => {},
  onToggleSwitch = () => {},
  toggleStatus = false,
  isDataReady = true,
  module = "",
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDeleteClick = (data) => {
    setSelectedItem(data);
    setOpen(true);
  };

  const handleSubmit = () => {
    onDeleteClick(selectedItem._id);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
            }}
          >
            <TableRow>
              <TableCell align="center">S.No</TableCell>
              {tableKeys.map((r, i) => (
                <TableCell sx={{ fontWeight: "bold" }} key={i} align="center">
                  {r.name}
                </TableCell>
              ))}
              {actions.length ? (
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Action
                </TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {bodyData.length && isDataReady
              ? bodyData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data, index) => (
                    <TableRow key={data._id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      {tableKeys.map((k, i) =>
                        k.type === "image" ? (
                          <TableCell key={i} align="center">
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Avatar
                                sx={{
                                  alignSelf: "center",
                                  objectFit: "contain",
                                }}
                                src={data[k.key]}
                              />
                            </Box>
                          </TableCell>
                        ) : (
                          <TableCell key={i} align="center">
                            {getDataValue(data, k)}
                          </TableCell>
                        )
                      )}
                      {actions.length ? (
                        <TableCell align="center">
                          {actions.includes("edit") && (
                            <Tooltip title="Edit">
                              <IconButton onClick={() => onEditClick(data)}>
                                <EditIcon color="primary" fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {actions.includes("delete") && (
                            <Tooltip title="Delete">
                              <IconButton
                                onClick={() => handleDeleteClick(data)}
                              >
                                <DeleteIcon fontSize="small" color="error" />
                              </IconButton>
                            </Tooltip>
                          )}

                          {actions.includes("view") && (
                            <Tooltip title="View">
                              <IconButton onClick={() => onViewClick(data)}>
                                <RemoveRedEyeRoundedIcon
                                  fontSize="small"
                                  color="primary"
                                />
                              </IconButton>
                            </Tooltip>
                          )}
                          {actions.includes("card") && (
                            <Tooltip title="Unbundle">
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => onCardClick(data)}
                              >
                                Card
                              </Button>
                            </Tooltip>
                          )}
                          {actions.includes("switch") && (
                            <Tooltip title={toggleStatus}>
                              <IconButton
                                size="small"
                                onClick={() => onToggleSwitch(data)}
                              >
                                <Switch
                                  size="small"
                                  checked={data[toggleStatus] === true}
                                />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      ) : null}
                    </TableRow>
                  ))
              : null}
          </TableBody>
        </Table>
        {!isDataReady ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "20px",
            }}
          >
            <PuffLoader size={30} color="dodgerblue" />
          </Box>
        ) : null}
        {isDataReady ? (
          <NoTableData dataPresent={bodyData.length} title={bodyDataModal} />
        ) : null}
        <TablePagination
          size="small"
          component="div"
          count={bodyData ? (bodyData.length ? bodyData.length : 0) : 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* === Delete modal === */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ textAlign: "center", margin: "10px auto" }}>
            <img src={image} width={50} height={50} />
          </Box>

          <Typography
            textAlign="center"
            sx={{ fontSize: "18px", fontWeight: 700 }}
          >
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
            }}
          >
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={handleSubmit}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
