import * as React from "react";
import PropTypes from "prop-types";

// Import third party libraries
import { DeleteIcon, EditIcon } from "../../../imports/icons.imports";

// Import custom part level components
import { AddNewCategoryForm } from "../addNewCategoryForm/AddNewCategoryForm.component";
import { EditCategoryForm } from "../editCategoryForm/EditCategoryForm.component";

import {
  alpha,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from "../../../imports/ui.imports";

export function CategoriesTableToolbar(props) {
  const {
    selected,
    onAddCategorySubmit,
    existingCategoryNames,
    onEditCategorySubmit,
  } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selected.length > 0 ? (
        selected.length === 1 ? (
          <Box
            sx={{
              display: "flex",
              flex: "1 1 100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <EditCategoryForm
              category={selected[0]}
              existingCategoryNames={existingCategoryNames}
              onEditCategorySubmit={onEditCategorySubmit}
            />
          </Box>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selected.length} selected
          </Typography>
        )
      ) : null}

      {selected.length > 0 ? (
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
            transform: "translateZ(0px)",
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
