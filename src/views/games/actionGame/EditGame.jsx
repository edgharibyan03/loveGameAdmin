import {
  Button,
  Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from '@mui/material';

import React from 'react';

export default function EditActionGame({
  open,
  handleClose,
  handleCloseAndUpdate,
  action,
  handleSetActions,
}) {
  console.log(action, 'action');

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
              <div className="karaoke-edit-modal-input">
                <TextField
                  id="outlined-basic"
                  label={`Action name ${item.language}`}
                  defaultValue={item.title}
                  variant="outlined"
                  onChange={(e) => {
                    handleSetActions(e.target.value, item.language);
                  }}
                  // size="small"
                  // inputRef={langInputRef}
                  type="text" />
              </div>
            ))
          }
          {/* <TextField
            id="outlined-basic"
            label="Language"
            defaultValue={karaoke?.karaoke.language}
            variant="outlined"
            // size="small"
            placeholder="Language"
            inputRef={langInputRef}
            type="text" />
          <TextField
            id="outlined-basic"
            label="Title"
            defaultValue={karaoke?.karaoke.title}
            variant="outlined"
            // size="small"
            placeholder="Title"
            inputRef={titleInputRef}
            type="text" />
          <TextField
            id="outlined-basic"
            label="Link"
            defaultValue={karaoke?.link}
            variant="outlined"
            // size="small"
            placeholder="Link"
            inputRef={linkInputRef}
            type="text" /> */}
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
