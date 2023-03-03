import {
  Button,
  Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, FormControlLabel,
} from '@mui/material';

import React from 'react';

export default function EditGiftCategory({
  open,
  handleClose,
  handleCloseAndUpdate,
  category,
  textInputRef,
}) {
  console.log(category, 'action');

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="karaoke-edit-modal"
    >
      <DialogTitle id="alert-dialog-title">
        Update Gift Category
      </DialogTitle>
      <DialogContent className="karaoke-edit-modal-cont">
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="karaoke-edit-modal-cont-inputs">
            <TextField defaultValue={category?.title} inputRef={textInputRef} id="outlined-basic" label="Diamond Price" variant="outlined" />
          </div>
        </Box>

      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>Disagree</Button>
        <Button variant="contained" onClick={handleCloseAndUpdate} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
