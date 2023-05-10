import { CFormSelect } from '@coreui/react';
import {
  Button,
  Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, FormControlLabel,
} from '@mui/material';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/store';
import { getGiftsCategories } from 'src/store/Slices/giftsCotegories';

const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right']

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
  timeInputRef,
  positionInputRef,
  titleInputRef,
}) {
  const dispatch = useAppDispatch();

  const giftsCotegories = useSelector((state) => state.giftsCotegories.giftCategory);

  console.log(gift, 'action');

  useEffect(() => {
    dispatch(getGiftsCategories('?skip=0&take=1010'));
  }, []);

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
            <TextField defaultValue={gift?.title} inputRef={titleInputRef} id="outlined-basic" label="Title" variant="outlined" />
            <TextField defaultValue={gift?.dimondPrice} inputRef={diamondPriceInputRef} id="outlined-basic" label="Diamond Price" variant="outlined" />
            <TextField defaultValue={gift?.goldPrice} inputRef={goldPriceInputRef} id="outlined-basic" label="Gold Price" variant="outlined" />
            <TextField defaultValue={gift?.level} inputRef={levelInputRef} id="outlined-basic" label="Level" variant="outlined" />
            {/* <TextField defaultValue={gift?.category?.category?.title} inputRef={categoryInputRef} id="outlined-basic" label="Category" variant="outlined" /> */}
            <CFormSelect
              aria-label="Default select example"
              ref={categoryInputRef}
              label="Category"
              style={{ marginBottom: '10px' }}
            >
              {/* { giftsCotegories?.categoryList?.map((cotegory, ind) => (<option key={ind} value={+cotegory.id}>{cotegory.title}</option>))} */}
              {giftsCotegories?.categoryList?.map((category, ind) => {
                return (
                  category.category && (
                    <option
                      key={ind}
                      value={+category.id}
                    >
                      {category.category.title}
                    </option>
                  )
                );
              })}
            </CFormSelect>
            <TextField defaultValue={gift?.time || null} inputRef={timeInputRef} id="outlined-basic" label="Time" variant="outlined" />
            <CFormSelect
              aria-label="Default select example"
              defaultValue={positions[0]}
              label="Position"
              ref={positionInputRef}
            >
              {/* { giftsCotegories?.categoryList?.map((cotegory, ind) => (<option key={ind} value={+cotegory.id}>{cotegory.title}</option>))} */}
              {positions?.map((position, ind) => {
                return (
                  <option
                    key={ind}
                    value={position}
                  >
                    {position}
                  </option>
                );
              })}
            </CFormSelect>
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
