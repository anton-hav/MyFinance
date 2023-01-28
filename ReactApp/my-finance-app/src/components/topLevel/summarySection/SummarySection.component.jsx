import { useEffect, useState } from "react";
// Import third party libraries
import { Typography, Grid, Masonry, Paper } from "../../../imports/ui.imports";
// Import custom part-level components
import { PieChartCategory } from "../../partLevel/index";
// Import services
import RecordService from "../../../services/record.service";
import CategoryService from "../../../services/category.service";
// Import custom types and utils
import CategoryInPieChartViewModel from "../../../types/model/view/categoryInPieChartView.model";
import CategoryTypes from "../../../utils/categoryTypes";

//#region LOCAL UTILS

const _recordService = new RecordService();
const _categoryService = new CategoryService();

/**
 * Get the records count specified by category id from the storage via API
 * @param {string} categoryId
 */
const getRecordsCountByCategoryId = async (categoryId) => {
  const count = await _recordService.getRecordsCountBySearchParametersFromApi({
    categoryId: categoryId,
  });
  return count;
};

/**
 * Get category in pie chart view models
 * @param {array} dtos - array of CategoryDto
 * @returns category view models as an array of CategoryInPieChartViewModel
 */
const getCategoryWithRecordsCountViewModels = async (dtos) => {
  const models = await Promise.all(
    dtos.map(async (dto) => {
      const count = await getRecordsCountByCategoryId(dto.id);
      let model = CategoryInPieChartViewModel.fromCategoryDto(dto);
      model.value = count;
      return model;
    })
  );

  return models;
};

//#endregion LOCAL UTILS

export function SummarySection() {
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expensesCategories, setExpensesCategories] = useState([]);
  // States for pie chart of the income categories
  const [incomePieChartModels, setIncomePieChartModels] = useState([]);
  // States for pie chart of the expenses categories
  const [expensesPieChartModels, setExpensesPieChartModels] = useState([]);

  //#region COMMON FUNCTIONS

  /**
   * Use effect that uploads categories from the database
   */
  useEffect(() => {
    /**
     * Get income categories from the database
     */
    const getIncomeCategoriesFromStorage = async () => {
      const data = await _categoryService.getIncomeCategoriesFromApi();
      setIncomeCategories(data);
    };

    /**
     * Get expense categories from the database
     */
    const getExpensesCategoriesFromStorage = async () => {
      const data = await _categoryService.getExpensesCategoriesFromApi();
      setExpensesCategories(data);
    };

    if (incomeCategories.length === 0) {
      getIncomeCategoriesFromStorage();
    }
    if (expensesCategories.length === 0) {
      getExpensesCategoriesFromStorage();
    }
  }, []);

  //#endregion COMMON FUNCTIONS

  //#region PIE CHART FOR INCOME CATEGORIES
  useEffect(() => {
    /**
     * Get income categories view models through API
     * @param {array} dtos - array of the CategoryDto objects
     */
    const getIncomeCategoriesFromApi = async (dtos) => {
      const models = await getCategoryWithRecordsCountViewModels(dtos);
      setIncomePieChartModels(models);
    };

    getIncomeCategoriesFromApi(incomeCategories);
  }, [incomeCategories]);

  //#endregion PIE CHART FOR INCOME CATEGORIES

  //#region PIE CHART FOR EXPENSES CATEGORIES

  useEffect(() => {
    /**
     * Get expenses categories view models through API
     * @param {array} dtos - array of the CategoryDto objects
     */
    const getExpensesCategoriesFromApi = async (dtos) => {
      const models = await getCategoryWithRecordsCountViewModels(dtos);
      setExpensesPieChartModels(models);
    };

    getExpensesCategoriesFromApi(expensesCategories);
  }, [expensesCategories]);
  //#endregion PIE CHART FOR EXPENSES CATEGORIES

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 1, mb: 2 }}>
            <Typography variant="h1">Records panel</Typography>
          </Paper>

          <Masonry columns={4} spacing={2}>
            <Paper sx={{ padding: 1 }}>
              <Typography variant="h2">Number of income records</Typography>
              <Typography variant="body1">
                This chart shows the number of records for each of the income
                categories.
              </Typography>
              <PieChartCategory data={incomePieChartModels} />
            </Paper>

            <Paper sx={{ padding: 1 }}>
              <Typography variant="h2">Number of expense records</Typography>
              <Typography variant="body1">
                This chart shows the number of records for each of the expense
                categories.
              </Typography>
              <PieChartCategory data={expensesPieChartModels} />
            </Paper>
          </Masonry>
        </Grid>
      </Grid>
    </>
  );
}
