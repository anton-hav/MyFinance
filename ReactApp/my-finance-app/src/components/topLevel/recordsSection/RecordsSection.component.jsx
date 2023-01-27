import { useState, useEffect } from "react";
// Import third party libraries
import { Typography, Grid, Paper, Masonry } from "../../../imports/ui.imports";
// Import custom part-level components
import {
  AddNewRecordForm,
  SmartSnackBar,
  RecordsListView,
  TransactionListForApproval,
} from "../../partLevel/index";
import { dayjs } from "../../../imports/utils.import";
// Import services
import RecordService from "../../../services/record.service";
import CategoryService from "../../../services/category.service";
// Import custom types and utils
import RecordInRecordsListViewModel from "../../../types/model/view/recordInRecordsListView.model";
import RecordInListForApprovalViewModel from "../../../types/model/view/recordInListForApprovalView.model";
import RecordDto from "../../../types/dto/record.dto";
import Periods from "../../../utils/periods.utils";
import CategoryTypes from "../../../utils/categoryTypes";
import RecordStatus from "../../../utils/recordStatus.utils";

//#region COMMON FUNCTIONS

const _recordService = new RecordService();
const _categoryService = new CategoryService();

/**
 * Compares records by date in descending order
 * @param {RecordDto} prev - first record to compare
 * @param {RecordDto} next - second record to compare
 * @returns difference between the two records as a number
 */
function recordCompareByDateDescending(prev, next) {
  return dayjs(next.createdDate).valueOf() - dayjs(prev.createdDate).valueOf();
}

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

export function RecordsSection() {
  const [snackBars, setSnackBars] = useState([]);
  // list of records view
  const [records, setRecords] = useState([]);
  const [period, setPeriod] = useState(Periods.getPeriodNameByDefault());
  const [selectedRecordType, setSelectedRecordType] = useState(
    CategoryTypes.getTypeForAll()
  );
  const [transactionsForApproval, setTransactionsForApproval] = useState([]);

  /**
   * checks if the model meets the filters requirements
   * @param {RecordInRecordsListViewModel} model - new record model
   */
  const isNewRecordModelValidByFilters = (model) => {
    let result = true;
    if (
      !CategoryTypes.isTypeForAll(selectedRecordType) &&
      model.category.type !== selectedRecordType.value
    ) {
      result = false;
    }

    const [dateFrom, dateTo] =
      Periods.convertPeriodNameToSearchParameters(period);

    if (
      dayjs(model.createdDate).isBefore(dateFrom) ||
      dayjs(model.createdDate).isAfter(dateTo)
    ) {
      result = false;
    }

    return result;
  };

  //#region RECORDS LIST VIEW LOGIC
  //------------------Filters----------------------------------------------

  /**
   * Handle the change of the period of display records in the list of the records view
   * @param {string} value - new period value
   */
  const handlePeriodChange = (value) => {
    setPeriod(value);
  };

  /**
   * Handle the change of the selected record/category type in the list of the records view
   * @param {*} value
   */
  const handleRecordTypeChange = (value) => {
    setSelectedRecordType(value);
  };

  //------------------Body------------------------------------------------

  useEffect(() => {
    /**
     * Get records from the storage via API
     * @returns records as an array of the RecordDto instance
     */
    const getRecordsFromServer = async () => {
      const [dateFrom, dateTo] =
        Periods.convertPeriodNameToSearchParameters(period);
      const data = await _recordService.getRecordsBySearchParametersFromApi({
        dateFrom: dateFrom,
        dateTo: dateTo,
        categoryType: selectedRecordType,
        recordStatus: RecordStatus.getApprovedStatus().value,
      });
      data.sort(recordCompareByDateDescending);
      return data;
    };

    /**
     * Get record view models.
     * This downloads data from the server and puts it into the records state.
     */
    const getRecordViewModels = async () => {
      const dtos = await getRecordsFromServer();
      const models = await Promise.all(
        dtos.map(async (dto) => {
          const category = await getCategoryById(dto.categoryId);
          let model = RecordInRecordsListViewModel.fromRecordDto(dto);
          model.category = category;
          return model;
        })
      );
      setRecords(models);
    };

    getRecordViewModels();
  }, [period, selectedRecordType]);

  /**
   * Handle delete record click event.
   * @param {RecordInRecordsListViewModel} record - record to delete
   */
  const handleDeleteRecordClick = async (record) => {
    /**
     * Remove the record from the records state.
     * @param {RecordInRecordsListViewModel} item - record to delete
     */
    const removeRecordFromRecordsState = (item) => {
      let index = records.findIndex((i) => i.id === item.id);
      const newRecords = records.slice();
      newRecords.splice(index, 1);
      setRecords(newRecords);
    };

    const result = await _recordService.deleteRecord(record.id);
    removeRecordFromRecordsState(record);
  };

  //#endregion RECORDS LIST VIEW LOGIC

  //#region ADD NEW RECORD FORM LOGIC
  /**
   * Handle submit ckick event from the add new transaction record form.
   * @param {Object} values - data from the add new transaction record form.
   */
  const handleAddNewRecordFormSubmit = async (values) => {
    /**
     * Get record view model
     * @param {RecordDto} record - new record
     * @returns record view model as a RecordInRecordsListViewModel
     */
    const getRecordViewModels = async (record) => {
      const category = await getCategoryById(record.categoryId);
      let model = RecordInRecordsListViewModel.fromRecordDto(record);
      model.category = category;
      return model;
    };

    /**
     * Add new record view model to the records state
     * @param {RecordInRecordsListViewModel} model - newly record view model
     */
    const addNewRecordModelToRecords = (model) => {
      let newRecords = [...records, model];
      newRecords.sort(recordCompareByDateDescending);
      setRecords(newRecords);
    };

    const result = await _recordService.createNewRecord(
      values.price,
      values.comment,
      values.createdDate,
      values.categoryId
    );

    const recordModel = await getRecordViewModels(result);
    const isValid = isNewRecordModelValidByFilters(recordModel);

    if (isValid) {
      addNewRecordModelToRecords(recordModel);
    }

    setSnackBars([
      ...snackBars,
      {
        id: crypto.randomUUID(),
        severity: "success",
        message: "New transaction successfully created!",
      },
    ]);
  };

  //#endregion ADD NEW RECORD FORM LOGIC

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

  //#region TRANSACTIONS FOR APPROVAL WIDGET LOGIC

  useEffect(() => {
    /**
     * Get records for approval from the storage via API
     * @returns records as an array of the RecordDto instance
     */
    const getRecordsFromServer = async () => {
      const data = await _recordService.getRecordsBySearchParametersFromApi({
        recordStatus: RecordStatus.getPlannedStatus().value,
      });
      data.sort(recordCompareByDateDescending);
      return data;
    };

    /**
     * Get record view models.
     * This downloads data from the server and puts it into the records state.
     */
    const getRecordViewModels = async () => {
      const dtos = await getRecordsFromServer();
      const models = await Promise.all(
        dtos.map(async (dto) => {
          const category = await getCategoryById(dto.categoryId);
          let model = RecordInListForApprovalViewModel.fromRecordDto(dto);
          model.category = category;
          return model;
        })
      );
      setTransactionsForApproval(models);
    };

    getRecordViewModels();
  }, []);

  /**
   * Remove the record from the records state.
   * @param {RecordInListForApprovalViewModel} item - record to delete
   */
  const removeTransactionForApprovalFromState = (item) => {
    let index = transactionsForApproval.findIndex((i) => i.id === item.id);
    const newTransactions = transactionsForApproval.slice();
    newTransactions.splice(index, 1);
    setTransactionsForApproval(newTransactions);
  };

  /**
   * Handle transaction approve click event.
   * @param {RecordInListForApprovalViewModel} value - transaction to approve
   */
  const handleApproveClick = async (value) => {
    /**
     * Get record view model
     * @param {RecordDto} record - new record
     * @returns record view model as a RecordInRecordsListViewModel
     */
    const getRecordViewModels = async (record) => {
      const category = await getCategoryById(record.categoryId);
      let model = RecordInRecordsListViewModel.fromRecordDto(record);
      model.category = category;
      return model;
    };

    /**
     * Add new record view model to the records state
     * @param {RecordInRecordsListViewModel} model - newly record view model
     */
    const addNewRecordModelToRecords = (model) => {
      let newRecords = [...records, model];
      newRecords.sort(recordCompareByDateDescending);
      setRecords(newRecords);
    };

    const dto = RecordDto.fromRecordInListForApprovalViewModel(value);
    dto.recordStatus = RecordStatus.getApprovedStatus().value;
    const result = await _recordService.updateRecord(dto);

    if (result) {
      const recordModel = await getRecordViewModels(dto);
      const isValid = isNewRecordModelValidByFilters(recordModel);
      removeTransactionForApprovalFromState(value);

      if (isValid) {
        addNewRecordModelToRecords(recordModel);
      }
    }

    setSnackBars([
      ...snackBars,
      {
        id: crypto.randomUUID(),
        severity: "success",
        message: "New transaction successfully created!",
      },
    ]);
  };

  /**
   * Handle reject sheduled transaction click event.
   * @param {RecordInListForApprovalViewModel} value - transaction to reject
   */
  const handleRejectClick = async (value) => {
    /**
     * Remove the record from the records state.
     * @param {RecordInListForApprovalViewModel} item - record to delete
     */
    const removeTransactionForApprovalFromState = (item) => {
      let index = transactionsForApproval.findIndex((i) => i.id === item.id);
      const newTransactions = transactionsForApproval.slice();
      newTransactions.splice(index, 1);
      setTransactionsForApproval(newTransactions);
    };

    const dto = RecordDto.fromRecordInListForApprovalViewModel(value);
    dto.recordStatus = RecordStatus.getRejectedStatus().value;
    const result = await _recordService.updateRecord(dto);
    if (result) {
      removeTransactionForApprovalFromState(value);
    }
  };

  //#endregion TRANSACTIONS FOR APPROVAL WIDGET LOGIC

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 1 }}>
            <Typography variant="h1">Records panel</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Masonry columns={1} spacing={2}>
            <Paper sx={{ padding: 1 }}>
              <Typography variant="h2">Add new transaction record</Typography>
              <AddNewRecordForm onSubmit={handleAddNewRecordFormSubmit} />
            </Paper>
            <Paper sx={{ padding: 1 }}>
              <Typography variant="h2">Scheduled transactions</Typography>
              <TransactionListForApproval
                transactionsForApproval={transactionsForApproval}
                onApproveClick={handleApproveClick}
                onRejectClick={handleRejectClick}
              />
            </Paper>
            <Paper sx={{ padding: 1 }}>
              <Typography variant="h2">Another record widget</Typography>
              <div>Curious information here</div>
            </Paper>
          </Masonry>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ padding: 1 }}>
            <Typography variant="h2">Transaction records</Typography>
            <Typography paragraph>
              In this widget you can find information about all your transaction
              records in chronological order. You can also filter out some
              entries using filters such as period and category type filters.
            </Typography>
            <RecordsListView
              records={records}
              onDeleteClick={handleDeleteRecordClick}
              periods={Periods.getPeriodsAsArrayOfString()}
              period={period}
              onPeriodChange={handlePeriodChange}
              recordTypes={CategoryTypes.getTypes()}
              recordType={selectedRecordType}
              onRecordTypeChange={handleRecordTypeChange}
            />
          </Paper>
        </Grid>
      </Grid>

      <SmartSnackBar source={snackBars} onClose={handleSnackBarClose} />
    </>
  );
}
