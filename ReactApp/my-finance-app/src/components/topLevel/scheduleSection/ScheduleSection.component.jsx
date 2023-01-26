import { snackbarClasses } from "@mui/material";
import { useState } from "react";
// Import third party libraries
import { Typography, Grid, Paper, Masonry } from "../../../imports/ui.imports";
// Import custom part-level components
import {
  AddNewPlannedTransactionForm,
  SmartSnackBar,
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
            <Typography paragraph>Lorem ipsum dolor sit amet...</Typography>
            {/* <PlannedTransactionListView/> */}
          </Paper>
        </Grid>
      </Grid>

      <SmartSnackBar source={snackBars} onClose={handleSnackBarClose} />
    </>
  );
}
