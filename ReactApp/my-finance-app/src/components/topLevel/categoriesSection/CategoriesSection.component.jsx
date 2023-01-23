import { useState, useEffect } from "react";
// Import third party libraries
import { Grid, Paper, Typography } from "../../../imports/ui.imports";
// Import custom part components
import {
  CategoriesTable,
  ConfirmDeleteCategoryDialog,
} from "../../partLevel/index";
// Import services
import CategoryService from "../../../services/category.service";
import RecordService from "../../../services/record.service";
// Import types and utils
import CategoryTypes from "../../../utils/categoryTypes";
import ConflictError from "../../../types/errors/conflict.error";
import CategoryInCategorySectionViewModel from "../../../types/model/view/categoryInCategorySectionView.model";

const _categoryService = new CategoryService();
const _recordService = new RecordService();

export function CategoriesSection() {
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expendituresCategories, setExpendituresCategories] = useState([]);
  const [existingIncomeCategoryNames, setExistingIncomeCategoryNames] =
    useState([]);
  const [
    existingExpendituresCategoryNames,
    setExistingExpendituresCategoryNames,
  ] = useState([]);
  const [categoriesToConfirm, setCategoriesToConfirm] = useState([]);

  /**
   * Get the records count specified by category id from the storage via API
   * @param {string} categoryId
   */
  const getRecordsCountByCategoryId = async (categoryId) => {
    const count = await _recordService.getRecordsCountBySearchParametersFromApi(
      {
        categoryId: categoryId,
      }
    );
    return count;
  };

  /**
   * Get category view model
   * @param {array} dtos - category data transfer objects as an array of CategoryDto
   * @returns array of CategoryInCategorySectionViewModel
   */
  const getCategoryViewModel = async (dtos) => {
    const categories = await Promise.all(
      dtos.map(async (dto) => {
        const count = await getRecordsCountByCategoryId(dto.id);
        let model = CategoryInCategorySectionViewModel.fromCategoryDto(dto);
        model.count = count;
        return model;
      })
    );

    return categories;
  };

  /**
   * Effect of changes in incomeCategories.
   */
  useEffect(() => {
    /**
     * Get income categories from the server and set to the state.
     */
    const setIncomeCategoriesFromServer = async () => {
      const dtos = await _categoryService.getIncomeCategoriesFromApi();
      if (dtos !== undefined) {
        const categories = await getCategoryViewModel(dtos);
        setIncomeCategories(categories);
      }
    };

    if (incomeCategories.length === 0) {
      setIncomeCategoriesFromServer();
    }
  }, [incomeCategories]);

  /**
   * Effect of changes in expendituresCategories.
   */
  useEffect(() => {
    /**
     * Get expense categories from the server and set to the state.
     */
    const setExpendituresCategoriesFromServer = async () => {
      const dtos = await _categoryService.getExpensesCategoriesFromApi();
      if (dtos !== undefined) {
        const categories = await getCategoryViewModel(dtos);
        setExpendituresCategories(categories);
      }
    };

    if (expendituresCategories.length === 0) {
      setExpendituresCategoriesFromServer();
    }
  }, [expendituresCategories]);

  /**
   * Clean up categories specified the category type from the state.
   * @param {CategoryType} categoryType - category type
   */
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
   * Delete categories
   * @param {array} categories - array of categories to delete as an array of CategoryInCategorySectionViewModel
   */
  const deleteCategories = async (categories) => {
    await Promise.all(
      categories.map(async (category) => {
        const result = await _categoryService.removeCategory(category.id);
        return result;
      })
    );
    cleanUpCategoriesState(categories.pop().type);
    setExistingExpendituresCategoryNames([]);
  };

  /**
   * Handle delete category click event.
   * @param {*} event - React event
   * @param {*} values - selected categories for deletion.
   */
  const handleDeleteCategory = async (event, values) => {
    const hasRecords = values.find((value) => value.count > 0) ? true : false;
    if (hasRecords) {
      setCategoriesToConfirm(values);
    } else {
      await deleteCategories(values);
    }
  };

  /**
   * Handle close confirm category deletion dialog event.
   * @param {boolean} answer - user's answer
   * @param {array} values - array of categories to delete as an array of CategoryInCategorySectionViewModel
   */
  const handleConfirmDeletionDialogClose = async (answer, values) => {
    if (answer) {
      await deleteCategories(values);
    }
    setCategoriesToConfirm([]);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 1 }}>
            <Typography variant="h1">Categories panel</Typography>
            <Typography paragraph sx={{ paddingLeft: 4, textAlign: "start" }}>
              All the necessary tools for working with categories are placed
              here. In addition, category-specific analytics will appear here.
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
                return {
                  category: category,
                  name: category.name,
                  records: category.count,
                };
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
                  return {
                    category: category,
                    name: category.name,
                    records: category.count,
                  };
                })}
                onAddCategorySubmit={(values) =>
                  handleAddCategorySubmit(
                    values,
                    CategoryTypes.getExpensesType()
                  )
                }
                onEditCategorySubmit={handleEditCategorySubmit}
                onDeleteCategory={handleDeleteCategory}
                existingCategoryNames={existingExpendituresCategoryNames}
              />
            </Paper>
          </Paper>
        </Grid>
      </Grid>
      <ConfirmDeleteCategoryDialog
        values={categoriesToConfirm}
        onClose={handleConfirmDeletionDialogClose}
      />
    </>
  );
}
