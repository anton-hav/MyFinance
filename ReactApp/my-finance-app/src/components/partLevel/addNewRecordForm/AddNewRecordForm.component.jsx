import { useEffect } from "react";
// Import third party libraries
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Divider,
} from "../../../imports/ui.imports";
import { useFormik, yup } from "../../../imports/formBuilder.import";

// Import custom part-level components
import { DateTimeField } from "../dateTimeField/DateTimeField.component";

import "./addNewRecordForm.component.css";

const patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

export function AddNewRecordForm(props) {
  const validationSchema = yup.object({
    price: yup
      .number()
      .typeError("Price must be a number.")
      .required("Is required")
      .positive("Only a positive number is allowed.")
      .test(
        "is-decimal",
        "The amount should be a decimal with maximum two digits after comma",
        (val) => {
          if (val != undefined) {
            return patternTwoDigisAfterComma.test(val);
          }
          return true;
        }
      ),
    createdDate: yup
      .date()
      .typeError("Date of the record must be a valid date.")
      .max(new Date(), "You cannot make future records.")
      .required("Is required"),
  });

  const formik = useFormik({
    initialValues: {
      price: "",
      //   categoryId: "",
      createdDate: "",
      //   comment: "",
    },
    validationSchema: validationSchema,
    onSubmit: (value) => {
      console.log(value);
    },
    enableReinitialize: true,
  });

  console.log(formik.errors.createdDate);

  return (
    <Box className="add-record">
      <Typography paragraph>Create new record here.</Typography>

      <form onSubmit={formik.handleSubmit} className="form">
        <Box className="first-line-wrapper">
          <TextField
            className="text-field"
            // fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            id="price"
            name="price"
            label="Add price"
            placeholder="Enter a price here"
            type="text"
            variant="standard"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />

          <DateTimeField
            className="date-field"
            id="created-date"
            name="createdDate"
            label="Date of creation"
            value={formik.values.createdDate}
            onChange={formik.setFieldValue}
            error={
              formik.touched.createdDate && Boolean(formik.errors.createdDate)
            }
            helperText={formik.touched.createdDate && formik.errors.createdDate}
          />
        </Box>

        <Box className="button">
          <Button type="submit">Add</Button>
        </Box>
      </form>
    </Box>
  );
}
