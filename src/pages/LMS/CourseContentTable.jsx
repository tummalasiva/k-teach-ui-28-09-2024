/** @format */

import React, { useContext, useState } from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";

// icons
import QuizIcon from "@mui/icons-material/Quiz";
import DeleteIcon from "@mui/icons-material/Delete";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import EditIcon from "@mui/icons-material/Edit";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import ContentContext from "../../context/ContentContext";
import CourseContext from "../../context/CourseContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { put } from "../../services/apiMethods";
import DeleteModal from "../../forms/DeleteModal";

const MuiTableCell = styled(TableCell)(() => ({
  width: "150px",
  fontSize: "15px",
  fontWeight: "bold",
  color: "black",
}));

export default function CourseContentTable({
  // chapter,
  // courseId,
  onEditClick = () => {},
  handelOpenDelModel = () => {},
  // handleDeleteChapter = () => {},
}) {
  const { chapter } = useContext(ContentContext);
  const { courseId, onUpdate } = useContext(CourseContext);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [dataToDelete, setDataToDelete] = useState("");

  const handleOpenModel = (id) => {
    setDataToDelete(id);
    setOpenDeleteModel(true);
  };

  const handleDeleteContent = async () => {
    let payload = {
      chapterId: chapter._id,
      contentId: dataToDelete,
    };

    try {
      const { data } = await put(
        PRIVATE_URLS.courseContent.deleteContent + "/" + courseId,
        payload
      );
      onUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <MuiTableCell align="center">S.No</MuiTableCell>
              <MuiTableCell align="center">Content Type</MuiTableCell>
              <MuiTableCell align="center">Content Title</MuiTableCell>
              <MuiTableCell align="center">Action</MuiTableCell>
              <MuiTableCell align="center">Sort</MuiTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chapter.contents?.map((item, index) => (
              <TableRow>
                <TableCell align="center">
                  <Typography sx={{ pr: "10px" }}>{index + 1}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      columnGap: "5px",
                    }}>
                    {item.type === "Video" ? (
                      <YouTubeIcon fontSize="small" color="error" />
                    ) : null}
                    {item.type === "Quiz" ? (
                      <QuizIcon fontSize="small" color="success" />
                    ) : null}
                    {item.type === "FlashCard" ? (
                      <ViewAgendaIcon fontSize="small" color="warning" />
                    ) : null}
                    {item.type === "Material" ? (
                      <InsertDriveFileIcon fontSize="small" color="info" />
                    ) : null}
                    {item.type === "CodePractice" ? (
                      <QuestionAnswerIcon
                        fontSize="small"
                        sx={{ color: "#1b3779" }}
                      />
                    ) : null}
                  </Box>
                </TableCell>

                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <Typography variant="inherit">
                      {item.title?.substring(0, 80)}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell align="center">
                  <IconButton onClick={() => onEditClick(item)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleOpenModel(item._id)}>
                    <DeleteIcon color="error" fontSize="small" />
                  </IconButton>
                </TableCell>

                <TableCell align="center">
                  {index === chapter.contents.length - 1 ? null : (
                    <IconButton>
                      {/*<IconButton onClick={() => sortContent(item._id, "down")}> */}
                      <ArrowDownward />
                    </IconButton>
                  )}
                  {index === 0 ? null : (
                    <IconButton>
                      {/* <IconButton onClick={() => sortContent(item._id, "up")}> */}
                      <ArrowUpward />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* delete model ======== */}
      <DeleteModal
        deleteModal={openDeleteModel}
        handleDelete={handleDeleteContent}
        // id={chapter?._id}
        setDeleteModal={setOpenDeleteModel}
      />
    </>
  );
}
