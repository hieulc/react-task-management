import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function NotificationDialog({ onClose, onOpen, title, content, onConfirm }) {
  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div>
      <Dialog open={handleOpen} onClose={handleClose}>
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: "20px", fontWeight: "bold", color: "#172b4d" }}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ fontSize: "14px", fontWeight: "400", color: "#172b4d" }}
          >
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            size="small"
            sx={{
              color: "#172b4d",
              fontSize: "14px",
              fontWeight: "400",
              textTransform: "capitalize",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            size="small"
            sx={{
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "400",
              textTransform: "capitalize",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NotificationDialog;
