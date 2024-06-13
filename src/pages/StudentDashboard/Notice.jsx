/** @format */

import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Grid } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const content = [
  {
    title: "Good Morning",
    date: "September 14, 2016",
    notice:
      "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
  },
  {
    title: "Good Morning",
    date: "September 14, 2016",
    notice:
      "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup ",
  },
  {
    title: "Good Morning",
    date: "September 14, 2016",
    notice:
      "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
  },
  {
    title: "Good Morning",
    date: "September 14, 2016",
    notice:
      "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
  },
  {
    title: "Good Morning",
    date: "September 14, 2016",
    notice:
      "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
  },
];

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflow: "hidden",
});
const CardContentWrapper = styled(CardContent)({
  flexGrow: 1,
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  maxHeight: "5.5em",
  textOverflow: "ellipsis",
});
const ScrollableCardContent = styled(CardContent)({
  overflowY: "auto",
});

export default function Notice() {
  const [expanded, setExpanded] = React.useState({});

  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

  return (
    <Grid container spacing={2}>
      {content.map((data, index) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
          <StyledCard>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              title={data.title}
              subheader={data.date}
            />
            <CardContentWrapper>
              <Typography variant="body2" color="text.secondary">
                {data.notice}
              </Typography>
            </CardContentWrapper>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expanded[index]}
                onClick={() => handleExpandClick(index)}
                aria-expanded={expanded[index]}
                aria-label="show more">
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
              <ScrollableCardContent>
                <Typography paragraph>{data.notice}</Typography>
              </ScrollableCardContent>
            </Collapse>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
}
