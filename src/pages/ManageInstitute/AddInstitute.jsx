import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React from "react";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import TimezoneSelect from "react-timezone-select";
import currencyCodes from "currency-codes";

import avatar from "../../assets/images/avatar.jpg";
import AddOrUpdateFiles from "../../forms/AddOrUpdateFiles";

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
export default function AddInstitute() {
  const currencies = currencyCodes.data.map((currency) => ({
    label: `${currency.currency} - ${currency.code}`,
    value: currency.code,
  }));
  const entryFormik = useFormik({
    initialValues: {
      schoolName: "",
      address: "",
      phoneNumber: "",
      regDate: dayjs(new Date()),
      email: "",
      fax: "",
      websiteFooter: "",
      note: "",
      image: "",
      currency: "",
      currencySymbol: "",
      sessionStartMonth: dayjs(new Date()),
      sessionEndMonth: dayjs(new Date()),
      rollNumber: "",
      attendenceType: "",
      admissionNumber: "",
      latitude: "",
      longitude: "",
      timeZone: "",
      googleAnalytics: "",
      teacherActivityFeedackEnable: "",
      facebookUrl: "",
      twitterUrl: "",
      linkedinUrl: "",
      googlePlusUrl: "",
      youtubeUrl: "",
      instagramUrl: "",
      pinterestUrl: "",
    },
    onSubmit: console.log("nnnn"),
  });
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: "15px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            background: "#ececec",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundPosition: "center",
          }}
        >
          <img
            src={avatar}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
            }}
            alt="Preview"
          />
        </Box>
        <Grid container spacing={2} display="flex" justifyContent="center">
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="image"
              formik={entryFormik}
              label="Logo"
              type="file"
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
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
              name="schoolName"
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
              name="phoneNumber"
              formik={entryFormik}
              label="Phone"
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
              required={true}
              name="websiteFooter"
              formik={entryFormik}
              label="Website Footer"
            />
          </Grid>

          <Grid xs={12} md={12} lg={12} item>
            <FormInput
              required={true}
              name="note"
              formik={entryFormik}
              label="Note"
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
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
              name="rollNumber"
              formik={entryFormik}
              label="Roll Number"
              options={rollNumber_Options}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="attendenceType"
              formik={entryFormik}
              label="Attendence Type "
              options={attendence_Type}
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="admissionNumber"
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
              name="timeZone"
              value={entryFormik.values.timeZone}
              onChange={(value) => entryFormik.setFieldValue("timeZone", value)}
              label="Time Zone"
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="googleAnalytics"
              formik={entryFormik}
              label="Google Analytics"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="teacherActivityFeedackEnable"
              formik={entryFormik}
              label="Teacher Activity FeedackEnable"
              options={[
                { label: "yes", value: "yes" },
                { label: "No", value: "No" },
              ]}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
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
              name="googlePlusUrl"
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

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
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
    </>
  );
}
