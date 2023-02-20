import {
  Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput, Button, Box, TextField, FormControlLabel, Checkbox,
} from '@mui/material';
import React from 'react';

export default function EditKaraoke({
  open,
  handleClose,
  handleCloseAndUpdate,
  langInputRef,
  titleInputRef,
  linkInputRef,
  karaoke,
  isPremiumCheckbox,
  isVisible,
  categoryInput,
}) {
  console.log(karaoke, 'karaoke');

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="karaoke-edit-modal"
    >
      <DialogTitle id="alert-dialog-title">
        Update karaoke
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
          <TextField
            id="outlined-basic"
            label="Language"
            defaultValue={karaoke?.karaoke.language}
            variant="outlined"
            placeholder="Language"
            inputRef={langInputRef}
            type="text"
          />
          <TextField
            id="outlined-basic"
            label="Title"
            defaultValue={karaoke?.karaoke.title}
            variant="outlined"
            placeholder="Title"
            inputRef={titleInputRef}
            type="text"
          />
          <TextField
            id="outlined-basic"
            label="Link"
            defaultValue={karaoke?.link}
            variant="outlined"
            placeholder="Link"
            inputRef={linkInputRef}
            type="text"
          />
          <div className="karaoke-edit-modal-footer">
            <TextField inputRef={categoryInput} defaultValue={karaoke?.category} id="outlined-basic" label="Category" variant="outlined" />
            <FormControlLabel inputRef={isPremiumCheckbox} control={<Checkbox defaultChecked={karaoke?.ispremium} />} label="Is Premium" />
            <FormControlLabel inputRef={isVisible} control={<Checkbox defaultChecked={karaoke?.visible} />} label="Visible" />
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
