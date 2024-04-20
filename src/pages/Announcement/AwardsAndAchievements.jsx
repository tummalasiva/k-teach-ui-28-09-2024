import React, { useState } from "react";
import { holidayTableKeys } from "../../data/tableKeys/holidayData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { awardAchievementTableKeys } from "../../data/tableKeys/awardAchievementsData";

export default function AwardsAndAchievements() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Award and Achievements" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="Award and Achievements"
        bodyData={data}
        tableKeys={awardAchievementTableKeys}
      />
    </>
  );
}
