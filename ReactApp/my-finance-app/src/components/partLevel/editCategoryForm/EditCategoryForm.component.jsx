import { useEffect } from "react";
//Import third party libraries
import { Box, TextField, Button } from "../../../imports/ui.imports";
import { useFormik, yup } from "../../../imports/formBuilder.import";

import "./editCategoryForm.component.css";

export function EditCategoryForm(props) {
  const { category, existingCategoryNames, onEditCategorySubmit } = props;

  // Form validation schema congiguration provided by yup.
  const validationSchema = yup.object({
    name: yup
      .string("Enter category name")
      .min(1, "Category name must be of minimum 8 characters length.")
      .max(45, "Category name should be less than 45 characters long.")
      .required("Category name is required")
      .test("existing", "Category name already exist.", function (value) {
        return !existingCategoryNames.includes(value);
      }),
  });

  const formik = useFormik({
    initialValues: {
      id: category.id,
      name: category.name,
      type: category.type,
    },
    validationSchema: validationSchema,
    onSubmit: (value) => {
      onEditCategorySubmit(value);
    },
    enableReinitialze: true,
  });

  // Effect called when existingCategoryNames is changed.
  // It is necessary to validate the form after receiving a response from the server.
  // Will be called the first time the component is rendered.
  // Will be called every time if the entered category name exists in the database
  // and is not already in existingCategoryNames.
  useEffect(() => {
    formik.validateForm();
  }, [existingCategoryNames]);

  return (
    <Box className="edit-category">
      <form onSubmit={formik.handleSubmit} className="form">
        <TextField
          className="text-field"
          fullWidth
          id="category-name"
          name="name"
          label="Edit category name"
          placeholder="Enter a new category name"
          type="text"
          variant="standard"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <Box className="button">
          <Button type="submit">Save</Button>
        </Box>
      </form>
    </Box>
  );
}
