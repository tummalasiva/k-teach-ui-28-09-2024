/** @format */

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Box,
  CardActionArea,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";

import SettingContext from "../../context/SettingsContext";

import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import themeData from "../../data/themeData";

const TableHeader = styled(TableCell)(({ theme }) => ({
  border: "1px solid gray",
  alignItems: "center",
  fontSize: "18px",
  fontWeight: 600,
  color: "black",
}));
const TableData = styled(TableCell)(({ theme }) => ({
  border: "1px solid gray",
  alignItems: "center",
}));

const DataBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  padding: "8px",
}));

const ExamVenue = () => {
  const { id } = useParams();
  const { selectedSetting } = useContext(SettingContext);

  const [venulist, setVenueList] = useState(null);
  useEffect(() => {
    const getVenu = async () => {
      try {
        const { data } = await get(
          `${PRIVATE_URLS.preadmissionExamSchedule.getVenueDetails}${id}`
        );
        setVenueList(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getVenu();
  }, []);

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "10px",
        }}>
        <Grid item xs={12} md={6} lg={6}>
          <Card sx={{ borderRadius: "10px", boxShadow: "5px" }}>
            <CardActionArea>
              <CardContent>
                <Box
                  sx={{
                    textAlign: "center",
                    backgroundColor: themeData.darkPalette.primary.main,
                    padding: "8px",
                    color: "#ffff",
                  }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Venue Details
                  </Typography>
                </Box>
                <DataBox>
                  {" "}
                  <Typography sx={{ fontWeight: "18px", fontWeight: 300 }}>
                    Academic Year :{venulist?.academicYear?.academicYearFrom}-
                    {venulist?.academicYear?.academicYearTo}
                  </Typography>
                </DataBox>
                <DataBox>
                  <Typography sx={{ fontWeight: "18px", fontWeight: 300 }}>
                    Class :{venulist?.class?.name}
                  </Typography>
                </DataBox>

                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableHeader align="center">Date & Time</TableHeader>
                      <TableHeader align="center">Room No</TableHeader>{" "}
                      <TableHeader align="center">Address</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableData align="center">
                        {" "}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}>
                          <Typography sx={{ mb: 0.5 }}>
                            {" "}
                            {dayjs(venulist?.dateOfExam).format(
                              "DD-MM-YYYY"
                            )}{" "}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography>
                            {" "}
                            Start Time - {venulist?.startTime}
                          </Typography>
                          <Typography>
                            End Time - {venulist?.endTime}
                          </Typography>
                        </Box>
                      </TableData>
                      <TableData align="center">
                        {" "}
                        {venulist?.venue?.roomNumber}
                      </TableData>
                      <TableData align="center">
                        {" "}
                        {venulist?.venue?.address}
                      </TableData>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default ExamVenue;
