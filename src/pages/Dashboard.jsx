import React from "react";
import PageHeader from "../components/PageHeader";

import Attendance from "../components/Dashboard/Attendance";
import QuickLinks from "../components/Dashboard/QuickLinks";
import Events from "../components/Dashboard/Events";
import FilterStudent from "../components/Dashboard/FilterStudent";

export default function Dashboard() {
  return (
    <>
      <PageHeader title="Welcome to school ERP " />
      <FilterStudent />
      <Attendance />
      <QuickLinks />
      <Events />
    </>
  );
}
