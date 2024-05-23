/** @format */

import React, { useEffect, useState } from "react";

import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { routesTableKeys } from "../../data/tableKeys/routesData";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { Card, Typography } from "@mui/material";

export default function Routes() {
  const [data, setData] = useState([]);
  const [sumOfSeat, setSumOfSeat] = useState(0);

  // get rout
  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.route.list);
      console.log(data, "herere");
      setData(
        data.result.map((r) => ({
          ...r,
          route: `${r.routeStart} - ${r.routeEnd}`,
          vehicle: r.vehicle?.number,
          totalSeats: r.vehicle?.totalSeats,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      const totalSeat = data.map((s) => parseInt(s.totalSeats));

      let sum = 0;
      for (let i = 0; i < totalSeat.length; i++) {
        sum += totalSeat[i];
      }
      setSumOfSeat(sum);
    }
  }, [data]);

  console.log(sumOfSeat, "sumOfSeat");

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <PageHeader title="Trips" />
      <Card
        style={{
          padding: 10,
          paddingLeft: "1rem",
          display: "flex",
          gap: "20px",
          borderRadius: 0,
        }}>
        <Typography>Vehicle: {data.length}</Typography>
        <Typography>Total Seats: {sumOfSeat}</Typography>
      </Card>
      <CustomTable
        actions={[]}
        tableKeys={routesTableKeys}
        bodyDataModal="trips"
        bodyData={data}
      />
    </>
  );
}
