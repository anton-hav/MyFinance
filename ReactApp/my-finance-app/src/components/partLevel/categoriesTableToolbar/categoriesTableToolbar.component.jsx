import * as React from "react";
import PropTypes from "prop-types";

// Import third party libraries
import { DeleteIcon } from "../../../imports/icons.imports";

// Import custom part level components
import { AddNewCategoryForm } from "../addNewCategoryForm/AddNewCategoryForm.component";

import {
  alpha,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from "../../../imports/ui.imports";

export function CategoriesTableToolbar(props) {
  const { numSelected, onAddCategorySubmit, existingCategoryNames } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : null}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AddNewCategoryForm
            existingCategoryNames={existingCategoryNames}
            onAddCategorySubmit={onAddCategorySubmit}
          />
        </Box>
      )}
    </Toolbar>
  );
}

CategoriesTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
