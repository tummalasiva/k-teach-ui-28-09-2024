/** @format */

import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";

// style

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";
const style = {
  width: "100%",
  height: "auto",
  bgcolor: "background.paper",
  p: 2,
};
const QuickFeeCollectModal = ({
  onSubmit = () => {},
  onPreviewButtonClick = () => {},
  onClose = () => {},
  open = false,
  payingAmount = 0,
  note = "",
  onUpdateNote = () => {},
  collectingFee = false,
  downloadingPreview = false,
  payingDate = null,
  setPayingDate = () => {},
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [paymentMode, setPaymentMode] = useState("");

  const [paymentDetails, setPaymentDetails] = useState({});

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPaymentMode(value);
  };

  const handlePaymentDetails = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPayingDate("");
    onSubmit(paymentMode, paymentDetails);
    setPaymentDetails({});
  };

  const onPreview = (e) => {
    e.preventDefault();
    onPreviewButtonClick(paymentMode, paymentDetails);
  };

  const handleClose = () => {
    setPaymentMode("");
    onClose();
  };

  useEffect(() => {
    setPaymentDetails({});
  }, [paymentMode]);

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="center"
                fontSize="20px"
                fontWeight="bold">
                Collect Fee
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="body">
                <b>Total Amount Being Paid:</b>{" "}
                {`₹${Number(payingAmount).toFixed(1)}`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Payment Date"
                  value={payingDate || null}
                  onChange={(newDate) => setPayingDate(newDate)}
                  renderInput={(params) => (
                    <TextField {...params} size="small" fullWidth />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControl required={true}>
                <FormLabel>Select payment method</FormLabel>
                <RadioGroup
                  row
                  value={paymentMode || ""}
                  name="payment"
                  onChange={handleFormChange}>
                  <Grid item xs={4} sm={4} md={2} lg={2}>
                    <FormControlLabel
                      value="Cash"
                      control={<Radio />}
                      label="CASH"
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={2} lg={2}>
                    <FormControlLabel
                      value="Cheque"
                      control={<Radio />}
                      label="Cheque"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sm={4}
                    md={2}
                    lg={2}
                    display="flex"
                    justifyContent={{
                      xs: "flex-start",
                      sm: "flex-start",
                      md: "center",
                      lg: "center",
                    }}>
                    <FormControlLabel
                      value="DD"
                      control={<Radio />}
                      label="DD"
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={2} lg={2}>
                    <FormControlLabel
                      value="Upi"
                      control={<Radio />}
                      label="UPI"
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={2} lg={2}>
                    <FormControlLabel
                      value="Card"
                      control={<Radio />}
                      label="Card"
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={2} lg={2}>
                    <FormControlLabel
                      value="Netbanking"
                      control={<Radio />}
                      label="Netbanking"
                    />
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="Note"
                multiline
                rows={3}
                name="note"
                value={note || ""}
                size="small"
                fullWidth
                onChange={(e) => onUpdateNote(e.target.value)}
              />
            </Grid>

            {paymentMode === "Cheque" && (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    size="small"
                    label="Bank Name"
                    value={paymentDetails.bankName || ""}
                    fullWidth
                    name="bankName"
                    onChange={handlePaymentDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    size="small"
                    label="Branch Name"
                    value={paymentDetails.branchName || ""}
                    fullWidth
                    name="branchName"
                    onChange={handlePaymentDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    size="small"
                    label="Cheque Number"
                    value={paymentDetails.chequeNumber || ""}
                    fullWidth
                    name="chequeNumber"
                    onChange={handlePaymentDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      label="Cheque Date"
                      value={paymentDetails.chequeDate || null}
                      onChange={(newDate) =>
                        handlePaymentDetails({
                          target: {
                            name: "chequeDate",
                            value: newDate,
                          },
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} size="small" fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </>
            )}

            {paymentMode === "DD" && (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    size="small"
                    label="Bank Name"
                    value={paymentDetails.bankName || ""}
                    fullWidth
                    name="bankName"
                    onChange={handlePaymentDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    size="small"
                    label="Branch Name"
                    value={paymentDetails.branchName || ""}
                    fullWidth
                    name="branchName"
                    onChange={handlePaymentDetails}
                  />
                </Grid>
              </>
            )}

            {paymentMode === "Upi" && (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    size="small"
                    label="UPI app name"
                    value={paymentDetails.upiApp || ""}
                    fullWidth
                    name="upiApp"
                    onChange={handlePaymentDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    size="small"
                    label="Ref Number"
                    value={paymentDetails.utrNo || ""}
                    fullWidth
                    name="utrNo"
                    onChange={handlePaymentDetails}
                  />
                </Grid>
              </>
            )}

            {paymentMode === "Card" && (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    size="small"
                    label="Bank Name"
                    value={paymentDetails.bankName || ""}
                    fullWidth
                    name="bankName"
                    onChange={handlePaymentDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    size="small"
                    label="Card Type"
                    value={paymentDetails.cardType || ""}
                    fullWidth
                    name="cardType"
                    onChange={handlePaymentDetails}
                  />
                </Grid>
              </>
            )}

            {paymentMode === "Netbanking" && (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    size="small"
                    label="Bank Name"
                    value={paymentDetails.bankName || ""}
                    fullWidth
                    name="bankName"
                    onChange={handlePaymentDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    size="small"
                    label="Reference Number"
                    value={paymentDetails.refNumber || ""}
                    fullWidth
                    name="refNumber"
                    onChange={handlePaymentDetails}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    size="small"
                    label="Paid By"
                    value={paymentDetails.paidByName || ""}
                    fullWidth
                    name="paidByName"
                    onChange={handlePaymentDetails}
                  />
                </Grid>
              </>
            )}

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              display="flex"
              justifyContent="flex-end"
              gap={2}>
              <Button
                size="small"
                onClick={() => handleClose()}
                variant="contained"
                color="error">
                cancel
              </Button>
              <LoadingButton
                size="small"
                loading={collectingFee}
                type="submit"
                variant="contained">
                collect
              </LoadingButton>
              <LoadingButton
                size="small"
                loading={downloadingPreview}
                onClick={onPreview}
                variant="contained">
                preview
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Dialog>
  );
};

export default QuickFeeCollectModal;
