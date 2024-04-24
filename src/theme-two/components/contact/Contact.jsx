import React from "react";
import { Box, styled } from "@mui/material";
import TopNav from "../../../theme-one/components/Navbar/TopNav";
import Navbar from "../../layout/header/Navbar";
import Footer from "../../layout/Footer";
import ContactUs from "../../../theme-one/components/Navbar/navbar/ContactUs";

const OuterBox = styled(Box)(({ theme }) => ({
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://images.unsplash.com/photo-1664463760781-f159dfe3af30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  paddingTop: "150px",
}));

export default function Contact() {
  return (
    <>
      <TopNav />
      <Navbar />
      <OuterBox>
        <ContactUs />
        <Footer />
      </OuterBox>
    </>
  );
}
