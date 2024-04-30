import Slider from "react-slick";
import styled from "@emotion/styled";
export const AppSlider = styled(Slider)`
  // width: 100%;
  .slick-track {
    display: flex;
    //flex-shrink: 1;
  }
  .slick-slide {
    display: flex;
    justify-content: center;
    //margin-bottom: 1;
    outline: none;
  }
  .slick-list {
    overflow: hidden;
  }
`;
