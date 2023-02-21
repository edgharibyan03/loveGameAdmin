import {
  Button,
  Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, FormControlLabel,
} from '@mui/material';

import React from 'react';

export default function EditActionGame({
  open,
  handleClose,
  handleCloseAndUpdate,
  action,
  handleSetActions,
  isPremiumCheckbox,
  isVisible,
  categoryInput,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="karaoke-edit-modal"
    >
      <DialogTitle id="alert-dialog-title">
        Update Action
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
          {
            action?.action.map((item) => (
              <div className="karaoke-edit-modal-input" key={Math.random()}>
                <TextField
                  id="outlined-basic"
                  label={`Action name ${item.language}`}
                  defaultValue={item.title}
                  variant="outlined"
                  onChange={(e) => {
                    handleSetActions(e.target.value, item.language);
                  }}
                  type="text" />
              </div>
            ))
          }
          <div className="karaoke-edit-modal-footer">
            <TextField inputRef={categoryInput} defaultValue={action?.category} id="outlined-basic" label="Category" variant="outlined" />
            <FormControlLabel inputRef={isPremiumCheckbox} control={<Checkbox defaultChecked={action?.ispremium} />} label="Is Premium" />
            <FormControlLabel inputRef={isVisible} control={<Checkbox defaultChecked={action?.visible} />} label="Visible" />
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
