import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  styled,
} from "@mui/material";

import mobileImg from "../../assets/images/loginpage.png";
import desktopImg from "../../assets/images/loginimage.png";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import { useFormik } from "formik";

const OuterBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${desktopImg})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  height: "100vh",
  "@media (max-width: 768px)": {
    // image for mobile view
    backgroundImage: `url(${mobileImg})`,
  },
}));

const InnerBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
}));

const FormCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  padding: "10px",
  borderRadius: "5px",
}));

export default function ForgotPassword() {
  const entryFormik = useFormik({
    initialValues: {
      type: "",
      contactNumber: "",
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <OuterBox>
        <InnerBox>
          <FormCard sx={{ minWidth: 375 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 22, fontWeight: 600, mb: 3 }}
                gutterBottom
              >
                Forgot Password
              </Typography>

              <FormSelect
                required={true}
                name="type"
                formik={entryFormik}
                label="User Type"
              />
              <FormInput
                required={true}
                name="contactNumber"
                formik={entryFormik}
                label="Contact Number"
              />
            </CardContent>
            <Button fullWidth size="small" variant="contained">
              Get Otp
            </Button>
            <Button
              fullWidth
              size="small"
              color="error"
              variant="contained"
              sx={{ mt: 2 }}
            >
              cancel
            </Button>
          </FormCard>
        </InnerBox>
      </OuterBox>
    </>
  );
}
