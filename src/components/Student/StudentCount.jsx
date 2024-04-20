import { Box, Stack, Typography, styled } from "@mui/material";
import React from "react";

const TitleContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  borderRadius: "5px",
  padding: "2px 5px",
  width: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const ValueContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default function StudentCount({
  title = "",
  count = 0,
  showTitle = false,
}) {
  return (
    <Stack direction="row" columnGap={showTitle ? 1 : 0}>
      {showTitle ? (
        <TitleContainer>
          <Typography
            sx={{ fontSize: "14px", color: "white", fontWeight: "bold" }}
          >
            {title}
          </Typography>
        </TitleContainer>
      ) : null}
      <ValueContainer>
        <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
          {count}
        </Typography>
      </ValueContainer>
    </Stack>
  );
}
