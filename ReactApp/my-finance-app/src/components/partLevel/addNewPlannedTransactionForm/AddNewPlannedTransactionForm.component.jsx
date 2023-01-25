import { useEffect, useState } from "react";
// Import third party libraries
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "../../../imports/ui.imports";
import { useFormik, yup } from "../../../imports/formBuilder.import";
import { cronParser } from "../../../imports/utils.import";
// Import custom part-level components
import { SelectCategory } from "../selectCategory/SelectCategory.component";
import { RecordTypeButtonToggler } from "../recordTypeButtonToggler/RecordTypeButtonToggler.component";
import { CronDailyInput } from "../cronDailyInput/CronDailyInput.component";
import { CronWeeklyInput } from "../cronWeeklyInput/CronWeeklyInput.component";
import { CronMonthlyInput } from "../cronMonthlyInput/CronMonthlyInput.component";
// Import services
import CategoryService from "../../../services/category.service";
// Import custom types and utils
import CategoryTypes from "../../../utils/categoryTypes";
// Import syles
import "./addNewPlannedTransactionForm.component.css";

const income = CategoryTypes.getIncomeType();
const expenses = CategoryTypes.getExpensesType();

const cronInputSchemes = [
  { name: "Daily" },
  { name: "Weekly" },
  { name: "Monthly" },
];

function CronInput(props) {
  const { scheme, error, helperText } = props;
  let component;
  if (scheme === cronInputSchemes[0].name) {
    component = <CronDailyInput {...props} />;
  } else if (scheme === cronInputSchemes[1].name) {
    component = <CronWeeklyInput />;
  } else if (scheme === cronInputSchemes[2].name) {
    component = <CronMonthlyInput />;
  }
  return (
    <>
      {component}
      {error ? (
        <Typography
          variant="body2"
          sx={{ color: "#d32f2f", fontSize: "0.75rem" }}
        >
          {helperText}
        </Typography>
      ) : null}
    </>
  );
}

const _categoryService = new CategoryService();

// Pattern for number field validation
const patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

export function AddNewPlannedTransactionForm(props) {
  const { existingPlannedTransactions, onSubmit } = props;
  const [categoryType, setCategoryType] = useState(expenses.value);
  const [categories, setCategories] = useState([]);
  const [cronSchema, setCronSchema] = useState(cronInputSchemes[0].name);

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

  const handleCronInputChange = (value) => {
    console.log(value);
  };

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
          if (val !== undefined) {
            return patternTwoDigisAfterComma.test(val);
          }
          return true;
        }
      )
      .test(
        "existing",
        "The planned transaction with the same properties is already scheduled.",
        function (value) {
          const existingTransactions = existingPlannedTransactions.filter(
            (t) => t.price === `${value}`
          );
          if (existingTransactions.length > 0) {
            const isExist =
              existingTransactions.find(
                (t) =>
                  t.categoryId === this.parent.categoryId &&
                  t.cron === this.parent.cron
              ) !== undefined;
            return isExist ? false : true;
          } else {
            return true;
          }
        }
      ),
    categoryId: yup
      .string("Select a category")
      .required("Is required")
      .test("existing", "Category is not exist.", function (value) {
        return categories.find((c) => c.id === value) !== undefined;
      })
      .test(
        "existing",
        "The planned transaction with the same properties is already scheduled.",
        function (value) {
          const existingTransactions = existingPlannedTransactions.filter(
            (t) => t.categoryId === value
          );
          if (existingTransactions.length > 0) {
            const isExist =
              existingTransactions.find(
                (t) =>
                  t.price === `${this.parent.price}` &&
                  t.cron === this.parent.cron
              ) !== undefined;
            return isExist ? false : true;
          } else {
            return true;
          }
        }
      ),
    cron: yup
      .string()
      .max(
        254,
        "Cron expression is too long. It must be less than 255 characters."
      )
      .test(
        "is-cron-valid",
        "Several parameters are incorrect. Enter valid values for time slots",
        (val) => {
          let isCronValid = true;
          try {
            cronParser.parseExpression(val);
          } catch (e) {
            isCronValid = false;
          }
          return isCronValid;
        }
      )
      .test(
        "existing",
        "The planned transaction with the same properties is already scheduled.",
        function (value) {
          const existingTransactions = existingPlannedTransactions.filter(
            (t) => t.cron === value
          );
          if (existingTransactions.length > 0) {
            const isExist =
              existingTransactions.find(
                (t) =>
                  t.price === `${this.parent.price}` &&
                  t.categoryId === this.parent.categoryId
              ) !== undefined;
            return isExist ? false : true;
          } else {
            return true;
          }
        }
      ),
  });

  // Initialise form buider with Formik
  const formik = useFormik({
    initialValues: {
      price: "",
      categoryId: "",
      cron: "",
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
    <Box className="add-planned-transaction">
      <Typography paragraph>Create new planned transaction rule.</Typography>

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

          <FormControl fullWidth>
            <InputLabel id="select-cron-schemes-label">
              Scheme of rules
            </InputLabel>
            <Select
              labelId="select-cron-schemes-label"
              id="select-cron"
              value={cronSchema}
              lable="Scheme of rules"
              variant="standard"
              onChange={(event) => setCronSchema(event.target.value)}
            >
              {cronInputSchemes.map((scheme) => (
                <MenuItem key={scheme.name} value={scheme.name}>
                  {scheme.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

        <CronInput
          scheme={cronSchema}
          id="cron"
          name="cron"
          value={formik.values.cron}
          onChange={formik.setFieldValue}
          error={formik.touched.cron && Boolean(formik.errors.cron)}
          helperText={formik.touched.cron && formik.errors.cron}
        />

        <Box className="button">
          <Button type="submit">Create</Button>
        </Box>
      </form>
    </Box>
  );
}
