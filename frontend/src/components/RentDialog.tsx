import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { DesktopDatePicker,LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { RentDialogProps } from "../common/interface";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const RentSchema = Yup.object().shape({
  startDate: Yup.date()
    .required("Start date is required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date can't be before start date")
    .required("End date is required"),
});

const RentDialog: React.FC<RentDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Choose Rental Period</DialogTitle>
      <Formik
        initialValues={{ startDate: null, endDate: null }}
        validationSchema={RentSchema}
        onSubmit={(values) => {
          onConfirm(values.startDate, values.endDate);
          onClose();
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <DialogContent>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={2}>
                  <Grid item sm={12} md={6}>
                    <Field name="startDate">
                      {(el: any) => (
                        <DesktopDatePicker
                          label="Start Date"
                          // inputFormat="dd/MM/yyyy"
                          value={values.startDate}
                          onChange={(newValue) =>
                            setFieldValue("startDate", newValue)
                          }
                          renderInput={(params:any) => (
                            <TextField
                              {...params}
                              error={el.meta.touched && Boolean(el.meta.error)}
                              helperText={el.meta.touched && el.meta.error}
                              fullWidth
                            />
                          )}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <Field name="endDate">
                      {(el: any) => (
                        <DesktopDatePicker
                          label="End Date"
                          // inputFormat="dd/MM/yyyy"
                          value={values.endDate}
                          onChange={(newValue) =>
                            setFieldValue("endDate", newValue)
                          }
                          renderInput={(params:any) => (
                            <TextField
                              {...params}
                              error={el.meta.touched && Boolean(el.meta.error)}
                              helperText={el.meta.touched && el.meta.error}
                              fullWidth
                            />
                          )}
                          minDate={values.startDate}
                        />
                      )}
                    </Field>
                  </Grid>
                </Grid>
              </LocalizationProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={!values.startDate || !values.endDate}
              >
                Confirm
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default RentDialog;
