import * as React from "react";
import {
  Divider,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function FormModal({
  formTitle = "",
  children,
  formik,
  open = false,
  onClose = () => {},
  submitButtonTitle = "",
  styles = {},
  adding = false,
}) {
  const theme = useTheme();
  let fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 650,
            ...styles,
          },
          component: "form",
          onSubmit: formik.handleSubmit,
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>{formTitle}</DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            padding: "10px",
          }}
        >
          {children}
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={onClose}
          >
            Close
          </Button>
          <LoadingButton
            size="small"
            loading={adding}
            variant="contained"
            type="submit"
          >
            {submitButtonTitle}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
