import { useState, useEffect } from "react";
// Import third party libraries
import { Typography, Grid, Paper, Masonry } from "../../../imports/ui.imports";
// Import custom part-level components
import {
  AddNewPlannedTransactionForm,
  SmartSnackBar,
  PlannedTransactionListView,
} from "../../partLevel/index";
// Import services
import PlannedTransactionService from "../../../services/plannedTransaction.service";
import CategoryService from "../../../services/category.service";
// Import custom types and utils
import PlannedTransactionInListViewModel from "../../../types/model/view/plannedTransactionInListView.model";
import CategoryTypes from "../../../utils/categoryTypes";
import ConflictError from "../../../types/errors/conflict.error";

//#region COMMON FUNCTIONS

const _plannedService = new PlannedTransactionService();
const _categoryService = new CategoryService();

const income = CategoryTypes.getIncomeType();
const expenses = CategoryTypes.getExpensesType();

/**
 * Get the category specified by category id from the storage via API
 * @param {string} categoryId - category id
 * @returns category as a CategoryDto instance
 */
const getCategoryById = async (categoryId) => {
  const category = await _categoryService.getCategoryByIdFromApi(categoryId);
  return category;
};

//#endregion COMMON FUNCTIONS

export function ScheduleSection() {
  const [snackBars, setSnackBars] = useState([]);
  const [plannedTransactions, setPlannedTransactions] = useState([]);
  const [existingPlannedTransactions, setExistingPlannedTransactions] =
    useState([]);
  const [selectedPlannedTransactionType, setSelectedPlannedTransactionType] =
    useState(CategoryTypes.getTypeForAll());
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");

  //#region PLANNED TRANSACTIONS LIST VIEW LOGIC

  //------------------Filters----------------------------------------------
  /**
   * Handle the change of the selected record/category type in the list of the records view
   * @param {*} value
   */
  const handlePlannedTransactionTypeChange = (value) => {
    setCategoryFilter("");
    setSelectedPlannedTransactionType(value);
  };

  const handleCategoryFilterChange = (value) => {
    setCategoryFilter(value);
  };

  // If planned transaction type in selectedPlannedTransactionType is changed
  useEffect(() => {
    const getCategoriesFromApi = async () => {
      let result;
      if (selectedPlannedTransactionType.value === income.value) {
        result = await _categoryService.getIncomeCategoriesFromApi();
      } else if (selectedPlannedTransactionType.value === expenses.value) {
        result = await _categoryService.getExpensesCategoriesFromApi();
      } else {
        const incomeCategories =
          await _categoryService.getIncomeCategoriesFromApi();
        const expenseCategories =
          await _categoryService.getExpensesCategoriesFromApi();
        result = [...incomeCategories, ...expenseCategories];
      }

      setCategories(result);
    };

    // Get categories that match the categoryType
    getCategoriesFromApi();
  }, [selectedPlannedTransactionType]);

  //------------------Body------------------------------------------------

  useEffect(() => {
    /**
     * Get planned transactions from the storage via API
     * @returns planned transactions as an array of the PlannedTransactionDto instance
     */
    const getPlannedTransactionsFromServer = async () => {
      const data =
        await _plannedService.getPlannedTransactionsBySearchParametersFromApi({
          categoryType: selectedPlannedTransactionType,
          categoryId: categoryFilter !== "" ? categoryFilter : null,
        });
      //data.sort(recordCompareByDateDescending);
      return data;
    };

    /**
     * Get planned transaction view models.
     * This downloads data from the server and puts it into the planned transactions state.
     */
    const getPlannedTransactionViewModels = async () => {
      const dtos = await getPlannedTransactionsFromServer();
      const models = await Promise.all(
        dtos.map(async (dto) => {
          const category = await getCategoryById(dto.categoryId);
          let model =
            PlannedTransactionInListViewModel.fromPlannedTransactionDto(dto);
          model.category = category;
          return model;
        })
      );
      setPlannedTransactions(models);
    };

    getPlannedTransactionViewModels();
  }, [selectedPlannedTransactionType, categoryFilter]);

  /**
   * Handle delete planned transaction click event.
   * @param {PlannedTransactionInListViewModel} plannedTransaction - planned transaction to delete
   */
  const handleDeletePlannedTransactionClick = async (plannedTransaction) => {
    /**
     * Remove the planned transaction from the planned transactions state.
     * @param {PlannedTransactionInListViewModel} item - planned transaction to delete
     */
    const removePlannedTransactionFromState = (item) => {
      let index = plannedTransactions.findIndex((i) => i.id === item.id);
      const newPlannedTransactions = plannedTransactions.slice();
      newPlannedTransactions.splice(index, 1);
      setPlannedTransactions(newPlannedTransactions);
    };

    const result = await _plannedService.deletePlannedTransaction(
      plannedTransaction.id
    );
    removePlannedTransactionFromState(plannedTransaction);
  };

  //#endregion PLANNED TRANSACTIONS LIST VIEW LOGIC

  //#region ADD NEW PLANNED TRANSACTION FORM

  const handleAddNewPlannedTransaction = async (values) => {
    /**
     * checks if the model meets the filters requirements
     * @param {PlannedTransactionInListViewModel} model - new planned transaction model
     */
    const isNewPlannedTransactionValidByFilters = (model) => {
      let result = true;
      // adds logic for validating
      return result;
    };

    /**
     * Get record view model
     * @param {PlannedTransactionDto} planned - new planned transaction
     * @returns planned transaction view model as a PlannedTransactionInListViewModel
     */
    const getPlannedTransactionViewModel = async (planned) => {
      const category = await getCategoryById(planned.categoryId);
      let model =
        PlannedTransactionInListViewModel.fromPlannedTransactionDto(planned);
      model.category = category;
      return model;
    };

    const addNewPlannedModelToPlannedTransactions = (model) => {
      let newPlannedTransactions = [...plannedTransactions, model];
      // sorting logic here
      setPlannedTransactions(newPlannedTransactions);
    };

    try {
      const result = await _plannedService.createNewPlannedTransaction(
        values.price,
        values.categoryId,
        values.cron
      );
      const plannedModel = await getPlannedTransactionViewModel(result);
      const isValid = isNewPlannedTransactionValidByFilters(plannedModel);

      if (isValid) {
        addNewPlannedModelToPlannedTransactions(plannedModel);
      }

      setSnackBars([
        ...snackBars,
        {
          id: crypto.randomUUID(),
          severity: "success",
          message: "New planned transaction successfully created!",
        },
      ]);
    } catch (error) {
      // If creation failed check if the planned transaction already exists
      if (error instanceof ConflictError) {
        // add the planned transaction to existingPlannedTransactions (to reduce the number of requests to the server)
        let existing = existingPlannedTransactions.slice();
        existing.push(values);
        setExistingPlannedTransactions(existing);
      }
    }
  };

  //#endregion ADD NEW PLANNED TRANSACTION FORM

  //#region SNACKBAR LOGIC

  /**
   * Handle close ckick event from the snack bar item.
   * @param {string} snackId - an unique identifier of the snack bar item.
   */
  const handleSnackBarClose = (snackId) => {
    const index = snackBars.findIndex((snack) => snack.id === snackId);
    let newSnackBars = [...snackBars];
    newSnackBars.splice(index, 1);
    setSnackBars(newSnackBars);
  };

  //#endregion SNACKBAR LOGIC

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 1 }}>
            <Typography variant="h1">Schedule panel</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Masonry columns={1} spacing={2}>
            <Paper sx={{ padding: 1 }}>
              <Typography variant="h2">Add new planned transaction</Typography>
              <AddNewPlannedTransactionForm
                existingPlannedTransactions={existingPlannedTransactions}
                onSubmit={handleAddNewPlannedTransaction}
              />
            </Paper>
          </Masonry>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ padding: 1 }}>
            <Typography variant="h2">Planned transactions</Typography>
            <Typography paragraph>
              In this widget, you can find information about all the scheduled
              transactions.You can also filter some records with category
              filters and category type filters.
            </Typography>
            <PlannedTransactionListView
              plannedTransactions={plannedTransactions}
              onDeleteClick={handleDeletePlannedTransactionClick}
              plannedTransactionTypes={CategoryTypes.getTypes()}
              plannedTransactionType={selectedPlannedTransactionType}
              onPlannedTransactionTypeChange={
                handlePlannedTransactionTypeChange
              }
              categories={categories}
              categoryFilter={categoryFilter}
              onCategoryChange={handleCategoryFilterChange}
            />
          </Paper>
        </Grid>
      </Grid>

      <SmartSnackBar source={snackBars} onClose={handleSnackBarClose} />
    </>
  );
}
