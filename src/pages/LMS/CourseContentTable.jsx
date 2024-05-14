import React from "react";
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

const MuiTableCell = styled(TableCell)(() => ({
  width: "150px",
  fontSize: "15px",
  fontWeight: "bold",
  color:"black",
}));

export default function CourseContentTable() {
  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <MuiTableCell align="center">S.No</MuiTableCell>
              <MuiTableCell align="center">Content Type</MuiTableCell>
              <MuiTableCell
                align="center"
              >
                Content Title
              </MuiTableCell>

              <MuiTableCell align="center">
                Action
              </MuiTableCell>

              <MuiTableCell align="center">
                Sort
              </MuiTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {chapter.contents?.map((item, index) => ( */}
              <TableRow>
                <TableCell align="center">
                  <Typography sx={{ pr: "10px" }}>1</Typography>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      columnGap: "5px",
                    }}
                  >
                    {/* {item.type === "Video" ? ( */}
                      <YouTubeIcon fontSize="small" color="error" />
                    {/* ) : null} */}
                    {/* {item.type === "Quiz" ? ( */}
                      <QuizIcon fontSize="small" color="success" />
                    {/* ) : null} */}
                    {/* {item.type === "FlashCard" ? ( */}
                      <ViewAgendaIcon fontSize="small" color="warning" />
                    {/* ) : null}{" "} */}
                    {/* {item.type === "Material" ? ( */}
                      <InsertDriveFileIcon fontSize="small" color="info" />
                    {/* ) : null} */}
                    {/* {item.type === "CodePractice" ? ( */}
                      <QuestionAnswerIcon
                        fontSize="small"
                        sx={{ color: "#1b3779" }}
                      />
                    {/* ) : null} */}
                  </Box>
                </TableCell>

                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="inherit">
                      oiioo
                      {/* {item.title?.substring(0, 80)} */}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell align="center">
                  <IconButton>
                  {/* <IconButton onClick={() => handleEditIconClick(item)}> */}
                    <EditIcon
                      fontSize="small"
                      // style={{
                      //   color: `${theme.palette.primary.main}`,
                      // }}
                    />
                  </IconButton>
                  <IconButton
                    color="error"
                    // onClick={() => handleOpenDeleteModal(item)}
                  >
                    <DeleteIcon color="error" fontSize="small" />
                  </IconButton>
                </TableCell>

                {/* <TableCell align="center">
                  {index === chapter.contents.length - 1 ? null : (
                    <IconButton onClick={() => sortContent(item._id, "down")}>
                      <ArrowDownwardIcon />
                    </IconButton>
                  )}
                  {index === 0 ? null : (
                    <IconButton onClick={() => sortContent(item._id, "up")}>
                      <ArrowUpwardIcon />
                    </IconButton>
                  )}
                </TableCell> */}
              </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
