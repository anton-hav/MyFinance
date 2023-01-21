import { useState, useEffect } from "react";
// Import third party libraries
import { Grid, Paper, Typography } from "../../../imports/ui.imports";
// Import custom part components
import { CategoriesTable } from "../../partLevel/index";
// Import services
import CategoryService from "../../../services/category.service";
// Import types and utils
import useToken from "../../../utils/hooks/useToken.hook";
import CategoryTypes from "../../../utils/categoryTypes";
import ConflictError from "../../../types/errors/conflict.error";

const _categoryService = new CategoryService();

export function CategoriesSection() {
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expendituresCategories, setExpendituresCategories] = useState([]);
  const [existingIncomeCategoryNames, setExistingIncomeCategoryNames] =
    useState([]);
  const [
    existingExpendituresCategoryNames,
    setExistingExpendituresCategoryNames,
  ] = useState([]);

  /**
   * Effect of changes in incomeCategories.
   */
  useEffect(() => {
    /**
     * Get income categories from the server and set to the state.
     */
    const setIncomeCategoriesFromServer = async () => {
      const categories = await _categoryService.getIncomeCategoriesFromApi();
      if (categories !== undefined) {
        setIncomeCategories(categories);
      }
    };

    if (incomeCategories.length === 0) {
      setIncomeCategoriesFromServer();
    }
  }, [incomeCategories]);

  useEffect(() => {
    /**
     * Get expense categories from the server and set to the state.
     */
    const setExpendituresCategoriesFromServer = async () => {
      const categories = await _categoryService.getExpensesCategoriesFromApi();
      if (categories !== undefined) {
        setExpendituresCategories(categories);
      }
    };

    if (expendituresCategories.length === 0) {
      setExpendituresCategoriesFromServer();
    }
  }, [expendituresCategories]);

  const cleanUpCategoriesState = (categoryType) => {
    if (categoryType === CategoryTypes.getIncomeType().value) {
      setIncomeCategories([]);
    } else if (categoryType === CategoryTypes.getExpensesType().value) {
      setExpendituresCategories([]);
    }
  };

  /**
   * Handle submit click event from the add new category form.
   * @param {Object} values - data from the add new category form
   * @param {Object} categoryType - type of the category (see CategoryTypes module)
   */
  const handleAddCategorySubmit = async (values, categoryType) => {
    try {
      // Try add new category
      const result = await _categoryService.createNewCategory(
        values.name,
        categoryType.value
      );

      // If new category was created clean up the category list.
      // This is necessary to get the actual categories from the server.
      if (result.id !== null) {
        cleanUpCategoriesState(categoryType.value);
      }
    } catch (error) {
      // If creation failed check if the category already exists
      if (error instanceof ConflictError) {
        // add the category name to existingCategoryNames (to reduce the number of requests to the API)
        if (categoryType.value === CategoryTypes.getIncomeType().value) {
          let existing = existingIncomeCategoryNames.slice();
          existing.push(values.name);
          setExistingIncomeCategoryNames(existing);
        } else if (
          categoryType.value === CategoryTypes.getExpensesType().value
        ) {
          let existing = existingExpendituresCategoryNames.slice();
          existing.push(values.name);
          setExistingExpendituresCategoryNames(existing);
        }
      }
    }
  };

  /**
   * Handle save click event from the edit category form.
   * @param {Object} values - data from the add new category form
   */
  const handleEditCategorySubmit = async (values) => {
    try {
      // Try add new category
      const result = await _categoryService.updateCategory(values);

      // If new category was created clean up the category list.
      // This is necessary to get the actual categories from the server.
      if (result) {
        cleanUpCategoriesState(values.type);
      }
    } catch (error) {
      // If creation failed check if the category already exists
      if (error instanceof ConflictError) {
        // add the category name to existingCategoryNames (to reduce the number of requests to the API)
        if (values.type === CategoryTypes.getIncomeType().value) {
          let existing = existingIncomeCategoryNames.slice();
          existing.push(values.name);
          setExistingIncomeCategoryNames(existing);
        } else if (values.type === CategoryTypes.getExpensesType().value) {
          let existing = existingExpendituresCategoryNames.slice();
          existing.push(values.name);
          setExistingExpendituresCategoryNames(existing);
        }
      }
    }
  };

  /**
   * Handle delete category click event.
   * @param {*} event - React event
   * @param {*} values - selected categories for deletion.
   */
  const handleDeleteCategory = async (event, values) => {
    await Promise.all(
      values.map(async (category) => {
        const result = await _categoryService.removeCategory(category.id);
        return result;
      })
    );
    cleanUpCategoriesState(values.pop().type);
    setExistingExpendituresCategoryNames([]);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper sx={{ padding: 1 }}>
          <Typography variant="h1">Categories panel</Typography>
          <Typography paragraph sx={{ paddingLeft: 4, textAlign: "start" }}>
            All the necessary tools for working with categories are placed here.
            In addition, category-specific analytics will appear here.
          </Typography>
          <Typography paragraph sx={{ paddingLeft: 4, textAlign: "start" }}>
            This panel gives you the following options:
            <br />- add new categories, <br />- rename existing categories,{" "}
            <br />- delete unnecessary categories.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper sx={{ padding: 1 }}>
          <Typography variant="h2">Income categories</Typography>
          <CategoriesTable
            rows={incomeCategories.map((category) => {
              return { category: category, name: category.name, records: 1 };
            })}
            onAddCategorySubmit={(values) =>
              handleAddCategorySubmit(values, CategoryTypes.getIncomeType())
            }
            onEditCategorySubmit={handleEditCategorySubmit}
            onDeleteCategory={handleDeleteCategory}
            existingCategoryNames={existingIncomeCategoryNames}
          />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <Paper sx={{ padding: 1 }}>
            <Typography variant="h2">Expenditures categories</Typography>
            <CategoriesTable
              rows={expendituresCategories.map((category) => {
                return { category: category, name: category.name, records: 1 };
              })}
              onAddCategorySubmit={(values) =>
                handleAddCategorySubmit(values, CategoryTypes.getExpensesType())
              }
              onEditCategorySubmit={handleEditCategorySubmit}
              onDeleteCategory={handleDeleteCategory}
              existingCategoryNames={existingExpendituresCategoryNames}
            />
          </Paper>
        </Paper>
      </Grid>
    </Grid>
  );
}
