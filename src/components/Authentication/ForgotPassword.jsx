/** @format */

import React, { useContext, useState } from "react";
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
import { LoadingButton } from "@mui/lab";
import SettingContext from "../../context/SettingsContext";
import { post } from "../../services/apiMethods";

const Type_Options = [
  {
    label: "Student",
    value: "student",
  },
  {
    label: "Employee",
    value: "employee",
  },
];

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
  const { selectedSetting } = useContext(SettingContext);
  const [loading, setLoading] = useState(false);

  const handeSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
      };
      setLoading(true);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const entryFormik = useFormik({
    initialValues: {
      userType: "",
      contactNumber: "",
    },
    onSubmit: handeSubmit,
  });

  return (
    <>
      <OuterBox>
        <InnerBox>
          <form onSubmit={entryFormik.handleSubmit}>
            <FormCard sx={{ minWidth: 375 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 22, fontWeight: 600, mb: 3 }}
                  gutterBottom>
                  Forgot Password
                </Typography>

                <FormSelect
                  required={true}
                  name="userTpe"
                  formik={entryFormik}
                  label="User Type"
                  options={Type_Options}
                />
                <FormInput
                  required={true}
                  name="contactNumber"
                  formik={entryFormik}
                  label="Contact Number"
                />
              </CardContent>
              <LoadingButton
                type="submit"
                loading={loading}
                fullWidth
                size="small"
                variant="contained">
                Get Otp
              </LoadingButton>
              <Button
                fullWidth
                size="small"
                color="error"
                variant="contained"
                sx={{ mt: 2 }}>
                cancel
              </Button>
            </FormCard>
          </form>
        </InnerBox>
      </OuterBox>
    </>
  );
}
