/** @format */

import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext, useState } from "react";

import NoTableData from "../../components/Tables/NoTableData";

import { LoadingButton } from "@mui/lab";
import { put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";

export default function EmployeeAttendanceTable({
  bodyData = [],
  date = new Date(Date.now()),
  setBodyData = () => {},
  bodyDataModal = "Attendance data",
  isDataReady = true,
}) {
  const [updating, setUpdating] = useState(false);
  const { selectedSetting } = useContext(SettingContext);

  const updateAttendance = (empId, status) => {
    setBodyData(
      bodyData.map((d) =>
        d.employee._id == empId ? { ...d, attendanceStatus: status } : d
      )
    );
  };

  const handleUpdateAll = (status) => {
    setBodyData(
      bodyData.map((d) => ({
        ...d,
        attendanceStatus: status,
      }))
    );
  };

  const handleUpdateAttendance = async () => {
    try {
      setUpdating(true);
      const { data } = await put(PRIVATE_URLS.employeeAttendance.update, {
        attendanceData: bodyData.map((d) => ({
          ...d,
          employee: d.employee._id,
        })),
        date,
        schoolId: selectedSetting._id,
      });
    } catch (error) {
      console.log(error);
    }
    setUpdating(false);
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
            }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                S.No
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Name
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Employee Id
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Present All{" "}
                <Checkbox
                  checked={
                    !bodyData.find((a) =>
                      ["absent", "late"].includes(a.attendanceStatus)
                    )
                      ? true
                      : false
                  }
                  onChange={() => handleUpdateAll("present")}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Absent All{" "}
                <Checkbox
                  checked={
                    !bodyData.find((a) =>
                      ["present", "late"].includes(a.attendanceStatus)
                    )
                      ? true
                      : false
                  }
                  onChange={() => handleUpdateAll("absent")}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Late All{" "}
                <Checkbox
                  checked={
                    !bodyData.find((a) =>
                      ["present", "absent"].includes(a.attendanceStatus)
                    )
                      ? true
                      : false
                  }
                  onChange={() => handleUpdateAll("late")}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bodyData.length
              ? bodyData.map((data, index) => (
                  <TableRow key={data._id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      {data.employee?.basicInfo?.name}
                    </TableCell>
                    <TableCell align="center">
                      {data.employee?.basicInfo?.empId}
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={
                          data.attendanceStatus === "present" ? true : false
                        }
                        onChange={() =>
                          updateAttendance(data?.employee?._id, "present")
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={
                          data.attendanceStatus === "absent" ? true : false
                        }
                        onChange={() =>
                          updateAttendance(data?.employee?._id, "absent")
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={
                          data.attendanceStatus === "late" ? true : false
                        }
                        onChange={() =>
                          updateAttendance(data?.employee?._id, "late")
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>

        {isDataReady ? (
          <NoTableData dataPresent={bodyData.length} title={bodyDataModal} />
        ) : null}
        {!bodyData.length ? null : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "5px 10px",
              alignItems: "center",
            }}>
            <LoadingButton
              variant="contained"
              loading={updating}
              onClick={handleUpdateAttendance}
              size="small">
              Update
            </LoadingButton>
          </Box>
        )}
      </TableContainer>
    </>
  );
}
