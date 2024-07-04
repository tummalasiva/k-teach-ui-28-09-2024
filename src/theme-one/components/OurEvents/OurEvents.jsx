/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Grid, Box, Button, styled, Container } from "@mui/material";
import Events from "./Events";
import Header from "../Header";
import themeData from "../../../data/themeData";
import SettingContext from "../../../context/SettingsContext";
import { get } from "../../../services/apiMethods";
import { PRIVATE_URLS } from "../../../services/urlConstants";

const View = styled(Grid)(({ theme }) => ({
  textAlign: "right",
  paddingBottom: "10px",
}));

const ViewButton = styled(Button)(({ theme }) => ({
  fontSize: "10px",
  color: themeData.darkPalette.primary.main,
  border: "1px solid",
}));

const ViewAllButton = ({ handleClick }) => {
  return (
    <View item xs={12} md={12}>
      <ViewButton onClick={handleClick}>View All</ViewButton>
    </View>
  );
};

const ViewLessButton = ({ handleClick }) => {
  return (
    <View item xs={12}>
      <ViewButton onClick={handleClick}>View Less</ViewButton>
    </View>
  );
};

const OurEvents = () => {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.event.listPublic, {
        params: { schoolId: selectedSetting._id },
      });
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedSetting._id]);

  const handleViewAllClick = () => {
    setShowAll(true);
  };

  const handleViewLessClick = () => {
    setShowAll(false);
  };

  return (
    <Container maxWidth="xl">
      <Box pt={3}>
        {" "}
        <Header title1="Our" title2="Events" />
      </Box>
      {data.length >= 4 && !showAll && (
        <ViewAllButton handleClick={handleViewAllClick} />
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}>
        {" "}
        {data.slice(0, showAll ? data.length : 3).map((card, index) => (
          <React.Fragment key={index}>
            <Events card={card} />
          </React.Fragment>
        ))}
      </Box>
      {showAll && <ViewLessButton handleClick={handleViewLessClick} />}
    </Container>
  );
};

export default OurEvents;
