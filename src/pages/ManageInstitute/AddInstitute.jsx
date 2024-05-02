import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useState } from "react";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import TimezoneSelect from "react-timezone-select";
import currencyCodes from "currency-codes";

import avatar from "../../assets/images/avatar.jpg";
import AddOrUpdateFiles from "../../forms/AddOrUpdateFiles";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";

const MuiBox = styled(Box)({
  background: "#ececec",
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  overflow: "hidden",
  backgroundPosition: "center",
});

const BasicData = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "15px",
  padding: "15px 0px",
});

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(2),

  position: "fixed",
  bottom: 0,
  right: 0,
  left: 0,
  background: "whitesmoke",

  padding: theme.spacing(2),
  zIndex: 1000,
}));

const rollNumber_Options = [
  {
    label: "Manual",
    value: "Manual",
  },
  {
    label: "Auto ascending name",
    value: "Auto ascending name",
  },
  {
    label: "Auto ascending name female",
    value: "Auto ascending name female",
  },
];
const attendence_Type = [
  {
    label: "Class wise",
    value: "Class wise",
  },
  {
    label: "Section wise",
    value: "Section wise",
  },
  {
    label: "Session wise",
    value: "Sessio wise",
  },
];
const admission_Options = [
  {
    label: "Manual",
    value: "Manual",
  },
  {
    label: "Auto ascending no",
    value: "Auto ascending no",
  },
];
export default function AddInstitute({ initialValue }) {
  const navigate = useNavigate();
  const [previewCreateUrl, setPreviewCreateUrl] = useState(null);
  const currencies = currencyCodes.data.map((currency) => ({
    label: `${currency.currency} - ${currency.code}`,
    value: currency.code,
  }));

  const entryFormik = useFormik({
    initialValues: {
      name: initialValue?.name || "",
      address: initialValue?.address || "",
      phone: initialValue?.phone || "",
      regDate:
        initialValue && initialValue.regDate
          ? dayjs(initialValue.regDate)
          : null,
      email: initialValue?.email || "",
      fax: initialValue?.fax || "",
      websiteFooter: initialValue?.websiteFooter || "",
      description: initialValue?.description || "",
      currency: initialValue?.currency || "",
      currencySymbol: initialValue?.currencySymbol || "",
      sessionStartMonth:
        initialValue && initialValue.sessionStartMonth
          ? dayjs(initialValue.sessionStartMonth)
          : null,
      sessionEndMonth:
        initialValue && initialValue.sessionEndMonth
          ? dayjs(initialValue.sessionEndMonth)
          : null,
      rollNumberType: initialValue?.rollNumberType || "",
      studentAttendenceType: initialValue?.studentAttendenceType || "",
      admissionNo: initialValue?.admissionNo || "",
      latitude: initialValue?.latitude || "",
      longitude: initialValue?.longitude || "",
      defaultTimeZone: initialValue?.defaultTimeZone || "",
      googleAnalyticsId: initialValue?.googleAnalyticsId || "",
      teacherActivityFeedbackEnabled:
        initialValue?.teacherActivityFeedbackEnabled || false,
      facebookUrl: initialValue?.facebookUrl || "",
      twitterUrl: initialValue?.twitterUrl || "",
      linkedinUrl: initialValue?.linkedinUrl || "",
      gplusUrl: initialValue?.gplusUrl || "",
      youtubeUrl: initialValue?.youtubeUrl || "",
      instagramUrl: initialValue?.instagramUrl || "",
      pinterestUrl: initialValue?.pinterestUrl || "",
      studentAttendenceType: initialValue?.studentAttendenceType || "",
    },
    onSubmit: console.log("nnnn"),
    enableReinitialize: true,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewCreateUrl(imageUrl);
    }
  };

  return (
    <>
      <PageHeader title="Add Institute" showTextField={false} />

      <BasicData>
        <MuiBox>
          <img
            src={previewCreateUrl || avatar}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
            }}
            alt="Preview"
          />
        </MuiBox>
        <Grid container spacing={2} display="flex" justifyContent="center">
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="image"
              formik={entryFormik}
              label="Logo"
              type="file"
              onChange={handleImageChange}
            />
          </Grid>
        </Grid>
      </BasicData>

      {/* Basic Info */}
      <Paper elevation={0} sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={12} lg={12} item>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              textAlign="start"
              sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
            >
              Basic Information
            </Typography>
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="name"
              formik={entryFormik}
              label="School Name"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="address"
              formik={entryFormik}
              label="Address"
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="number"
              formik={entryFormik}
              label="Phone number"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              label="Registration Date"
              name="regDate"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="email"
              formik={entryFormik}
              label="Email"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="fax"
              formik={entryFormik}
              label="Fax"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              name="websiteFooter"
              formik={entryFormik}
              label="Website Footer"
            />
          </Grid>

          <Grid xs={12} md={12} lg={12} item>
            <FormInput name="description" formik={entryFormik} label="Note" />
          </Grid>
        </Grid>
      </Paper>
      {/* Settings */}
      <Paper elevation={0} sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={12} lg={12} item>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              textAlign="start"
              sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
            >
              Setting Information
            </Typography>
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="currency"
              formik={entryFormik}
              label="Currency"
              options={currencies}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="currencySymbol"
              formik={entryFormik}
              label="Currency Symbol"
              disabled={true}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              label="Session Start Month"
              name="sessionStartMonth"
              openTo="month"
              inputFormat="MM"
              views={["month"]}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              label="Session End Month"
              name="sessionEndMonth"
              openTo="month"
              inputFormat="MM"
              views={["month"]}
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="rollNumberType"
              formik={entryFormik}
              label="Roll Number"
              options={rollNumber_Options}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="studentAttendenceType"
              formik={entryFormik}
              label="Attendence Type "
              options={attendence_Type}
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="admissionNo"
              formik={entryFormik}
              label="Admission Numder"
              options={admission_Options}
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="latitude"
              formik={entryFormik}
              label="Latitude"
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="longitude"
              formik={entryFormik}
              label="Longitude"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item mt={2}>
            <TimezoneSelect
              styles={{
                control: (baseStyle, state) => ({
                  ...baseStyle,
                  height: "42px",
                }),
              }}
              placeholder="Select default timezone"
              name="defaultTimeZone"
              value={entryFormik.values.defaultTimeZone}
              onChange={(value) =>
                entryFormik.setFieldValue("defaultTimeZone", value)
              }
              label="Time Zone"
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="googleAnalyticsId"
              formik={entryFormik}
              label="Google Analytics Id"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="teacherActivityFeedbackEnabled"
              formik={entryFormik}
              label="Teacher Activity FeedackEnable"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
            />
          </Grid>
        </Grid>
      </Paper>
      {/* Social Info */}
      <Paper elevation={0} sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={12} lg={12} item>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              textAlign="start"
              sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
            >
              Social Information
            </Typography>
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="facebookUrl"
              formik={entryFormik}
              label="Facebook URL"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="twitterUrl"
              formik={entryFormik}
              label="TwitterURL"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="linkedinUrl"
              formik={entryFormik}
              label="Linkedin Url"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="gplusUrl"
              formik={entryFormik}
              label="Google Plus Url"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="youtubeUrl"
              formik={entryFormik}
              label="Youtube URL"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="instagramUrl"
              formik={entryFormik}
              label="Instagram URL"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="pinterestUrl"
              formik={entryFormik}
              label="Pinterest URL"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Banner Images */}
      <Paper elevation={0} sx={{ padding: 2, marginBottom: "60px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              textAlign="start"
              sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
            >
              Banner Image
            </Typography>
          </Grid>

          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            justifyContent="flex-end"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <AddOrUpdateFiles title="Upload Image" />
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Grid container>
        <Grid item xs={12} md={12}>
          <StyledBox
          // sx={{
          //   backgroundColor: (theme) =>
          //     theme.palette.mode === "dark"
          //       ? "rgba(32,33,32,1)"
          //       : theme.palette.grey[100],
          // }}
          >
            <Stack spacing={2} direction="row">
              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button size="small" variant="contained">
                Submit
              </Button>
            </Stack>
          </StyledBox>
        </Grid>
      </Grid>
    </>
  );
}
