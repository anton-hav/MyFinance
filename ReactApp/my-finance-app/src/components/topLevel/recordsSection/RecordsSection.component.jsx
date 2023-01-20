// Import third party libraries
import { Typography, Grid, Paper, Masonry } from "../../../imports/ui.imports";
// Import custom part-level components
import { AddNewRecordForm } from "../../partLevel/index";

export function RecordsSection() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper sx={{ padding: 1 }}>
          <Typography variant="h1">Records panel</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Masonry columns={1} spacing={2}>
          <Paper sx={{ padding: 1 }}>
            <Typography variant="h2">Add new records form</Typography>
            <AddNewRecordForm />
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
          <Typography variant="h2">Cash flow records</Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
