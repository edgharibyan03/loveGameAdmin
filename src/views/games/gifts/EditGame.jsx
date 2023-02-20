import {
  Button,
  Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, FormControlLabel,
} from '@mui/material';

import React from 'react';

export default function EditGift({
  open,
  handleClose,
  handleCloseAndUpdate,
  gift,
  isVisibleCheckbox,
  isPremiumCheckbox,
  categoryInputRef,
  goldPriceInputRef,
  diamondPriceInputRef,
  levelInputRef,
  imageInputRef,
}) {
  console.log(gift, 'action');

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="karaoke-edit-modal"
    >
      <DialogTitle id="alert-dialog-title">
        Update Gift
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
            <TextField defaultValue={gift?.dimondPrice} inputRef={diamondPriceInputRef} id="outlined-basic" label="Diamond Price" variant="outlined" />
            <TextField defaultValue={gift?.goldPrice} inputRef={goldPriceInputRef} id="outlined-basic" label="Gold Price" variant="outlined" />
            <TextField defaultValue={gift?.level} inputRef={levelInputRef} id="outlined-basic" label="Level" variant="outlined" />
            <TextField defaultValue={gift?.category} inputRef={categoryInputRef} id="outlined-basic" label="Category" variant="outlined" />
            <FormControlLabel inputRef={isPremiumCheckbox} control={<Checkbox defaultChecked={gift?.ispremium} />} label="Is Premium" />
            <FormControlLabel inputRef={isVisibleCheckbox} control={<Checkbox defaultChecked={gift?.visible} />} label="Is Visible" />
            <input type="file" ref={imageInputRef} />
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
