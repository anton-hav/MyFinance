import * as React from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Paper from "@mui/material/Paper";
// import Draggable from "react-draggable";

// Import third-party libraries
import {
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Draggable,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "../../../imports/ui.imports";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export function ConfirmDeleteCategoryDialog(props) {
  const { values, onClose } = props;

  return (
    <Dialog
      open={values.length > 0 ? true : false}
      onClose={() => onClose(false, values)}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Confirm category deletion
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography sx={{ mb: 3 }} component={"div"}>
            One or more categories contain transaction records. This data will
            be deleted as well. Please confirm the deletion operation.
            <br />
          </Typography>
          <Typography variant="body1" component={"div"}>
            List of categories with transaction records:
          </Typography>
          <List dense={true}>
            {values
              .filter((category) => category.count > 0)
              .map((category) => (
                <ListItem key={category.id}>
                  <ListItemText
                    primary={<div>&#x2022; {category.name}</div>}
                    secondary={`with ${category.count} records`}
                  />
                </ListItem>
              ))}
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => onClose(false, values)}>
          Cancel
        </Button>
        <Button onClick={() => onClose(true, values)}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
