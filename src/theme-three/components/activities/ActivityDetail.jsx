/** @format */

import React from "react";

import EventDetails from "../../../theme-one/components/OurEvents/EventDetails";
import SubHeader from "../../../theme-one/components/SubHeader";

export default function Activitydetails() {
  return (
    <>
      {" "}
      <SubHeader
        title="Recent Activities"
        leftSideHeader="HOME"
        rightSideHeader="Recent Activities"
      />
      <EventDetails show={false} />
    </>
  );
}
