import { useState } from "react";
// Import third party libraries
import { Typography, Grid, Paper, Masonry } from "../../../imports/ui.imports";
// Import custom part-level components
import { AddNewRecordForm, SmartSnackBar } from "../../partLevel/index";
// Import services
import RecordService from "../../../services/record.service";

const _recordService = new RecordService();

export function RecordsSection() {
  const [snackBars, setSnackBars] = useState([]);

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
          </Paper>
        </Grid>
      </Grid>

      <SmartSnackBar source={snackBars} onClose={handleSnackBarClose} />
    </>
  );
}
