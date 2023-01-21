import React from "react";
// Import third party libraries
import { Stack, Snackbar, MuiAlert } from "../../../imports/ui.imports";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function SmartSnackBar(props) {
  const { source, onClose } = props;

  const handleClose = (event, reason, id) => {
    if (reason === "clickaway") {
      return;
    }

    onClose(id);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {source.length > 0
        ? source.map((snack) => (
            <Snackbar
              key={snack.id}
              open={true}
              autoHideDuration={6000}
              onClose={(event, reason) => handleClose(event, reason, snack.id)}
            >
              <Alert
                onClose={handleClose}
                severity={snack.severity}
                sx={{ width: "100%" }}
              >
                {snack.message}
              </Alert>
            </Snackbar>
          ))
        : null}
    </Stack>
  );
}
