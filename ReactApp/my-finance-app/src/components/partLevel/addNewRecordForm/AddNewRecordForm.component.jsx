import { useEffect, useState } from "react";
// Import third party libraries
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "../../../imports/ui.imports";
import { useFormik, yup } from "../../../imports/formBuilder.import";
// Import custom part-level components
import { DateTimeField } from "../dateTimeField/DateTimeField.component";
import { SelectCategory } from "../selectCategory/SelectCategory.component";
import { RecordTypeButtonToggler } from "../recordTypeButtonToggler/RecordTypeButtonToggler.component";
// Import services
import CategoryService from "../../../services/category.service";
// Import custom types and utils
import CategoryTypes from "../../../utils/categoryTypes";
// Import syles
import "./addNewRecordForm.component.css";

const income = CategoryTypes.getIncomeType();
const expenses = CategoryTypes.getExpensesType();

const _categoryService = new CategoryService();

// Pattern for number field validation
const patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;
// Start date for cratedDate field
const today = new Date();

export function AddNewRecordForm(props) {
  const { onSubmit } = props;
  const [categoryType, setCategoryType] = useState(expenses.value);
  const [categories, setCategories] = useState([]);

  // If category type in categoryTypes is changed
  useEffect(() => {
    const getCategoriesFromApi = async () => {
      let result;
      if (categoryType === income.value) {
        result = await _categoryService.getIncomeCategoriesFromApi();
      } else if (categoryType === expenses.value) {
        result = await _categoryService.getExpensesCategoriesFromApi();
      }

      setCategories(result);
      formik.setFieldValue("categoryId", "");
    };

    // Get categories that match the categoryType
    getCategoriesFromApi();
  }, [categoryType]);

  // Form validation schema configuration provided by yup.
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
      .required("Is required")
      .test("check-date", "Date is checked", function (val) {
        return val;
      }),
    categoryId: yup
      .string("Select a category")
      .required("Is required")
      .test("existing", "Category is not exist.", function (value) {
        return categories.find((c) => c.id === value) !== undefined;
      }),
    comment: yup
      .string()
      .max(254, "Comment is too long. It must be less than 255 characters."),
  });

  // Initialise form buider with Formik
  const formik = useFormik({
    initialValues: {
      price: "",
      categoryId: "",
      createdDate: today,
      comment: "",
    },
    validationSchema: validationSchema,
    onSubmit: (value, { resetForm }) => {
      // Put value to the parent component via the props.onSubmit
      onSubmit(value);
      resetForm();
    },
    enableReinitialize: true,
  });

  return (
    <Box className="add-record">
      <Typography paragraph>Create new record here.</Typography>

      <form onSubmit={formik.handleSubmit} className="form">
        <Box className="line-wrapper">
          <TextField
            className="text-field"
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

        <Box className="line-wrapper">
          <Box className="type-toggler">
            <RecordTypeButtonToggler
              value={categoryType}
              onChange={setCategoryType}
            />
          </Box>

          <Box className="category-selector">
            <SelectCategory
              source={categories}
              id="categoryId"
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.setFieldValue}
              error={
                formik.touched.categoryId && Boolean(formik.errors.categoryId)
              }
              helperText={formik.touched.categoryId && formik.errors.categoryId}
            />
          </Box>
        </Box>

        <TextField
          className="text-field"
          fullWidth
          id="comment"
          name="comment"
          label="Comment"
          placeholder="Enter your comment here..."
          type="text"
          multiline
          minRows={3}
          maxRows={5}
          value={formik.values.comment}
          onChange={formik.handleChange}
          error={formik.touched.comment && Boolean(formik.errors.comment)}
          helperText={formik.touched.comment && formik.errors.comment}
        />

        <Box className="button">
          <Button type="submit">Create</Button>
        </Box>
      </form>
    </Box>
  );
}
