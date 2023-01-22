import { useState, useEffect } from "react";
// Import third party libraries
import { Typography, Grid, Paper, Masonry } from "../../../imports/ui.imports";
// Import custom part-level components
import {
  AddNewRecordForm,
  SmartSnackBar,
  RecordsListView,
} from "../../partLevel/index";
// Import services
import RecordService from "../../../services/record.service";
import CategoryService from "../../../services/category.service";
// Import custom types and utils
import RecordInRecordsListViewModel from "../../../types/model/view/recordInRecordsListView.model";

const _recordService = new RecordService();
const _categoryService = new CategoryService();

export function RecordsSection() {
  const [snackBars, setSnackBars] = useState([]);
  const [records, setRecords] = useState([]);

  //#region RECORDS LIST VIEW LOGIC

  useEffect(() => {
    /**
     * Get the category specified by category id from the storage via API
     * @param {string} categoryId - category id
     * @returns category as a CategoryDto instance
     */
    const getCategoryById = async (categoryId) => {
      const category = await _categoryService.getCategoryByIdFromApi(
        categoryId
      );
      return category;
    };

    /**
     * Get records from the storage via API
     * @returns records as an array of the RecordDto instance
     */
    const getRecordsFromServer = async () => {
      const data = await _recordService.getRecordsBySearchParametersFromApi();
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
  }, []);

  //#endregion RECORDS LIST VIEW LOGIC

  //#region ADD NEW RECORD FORM LOGIC
  /**
   * Handle submit ckick event from the add new transaction record form.
   * @param {Object} values - data from the add new transaction record form.
   */
  const handleAddNewRecordFormSubmit = async (values) => {
    const result = await _recordService.createNewRecord(
      values.price,
      values.comment,
      values.createdDate,
      values.categoryId
    );
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
              <Typography variant="h2">Some record widget</Typography>
              <div>Important information here</div>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
              Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
              gravida rutrum quisque non tellus. Convallis convallis tellus id
              interdum velit laoreet id donec ultrices. Odio morbi quis commodo
              odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum
              est ultricies integer quis. Cursus euismod quis viverra nibh cras.
              Metus vulputate eu scelerisque felis imperdiet proin fermentum
              leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
              lobortis feugiat vivamus at augue. At augue eget arcu dictum
              varius duis at consectetur lorem. Velit sed ullamcorper morbi
              tincidunt. Lorem donec massa sapien faucibus et molestie ac.
            </Typography>
            <RecordsListView records={records} />
          </Paper>
        </Grid>
      </Grid>

      <SmartSnackBar source={snackBars} onClose={handleSnackBarClose} />
    </>
  );
}
