import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import React from 'react';

export default function EditQuestionGame({
  open,
  handleClose,
  isPremiumCheckboxRef,
  visibleCheckboxRef,
  categoryInputRef,
  handleCloseAndUpdate,
  handleSetQuestions,
  question,
  changeImages,
  setChangeImages,
  fileInputRef,
}) {
  console.log(question, 'questionquestion');
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="question-edit-modal"
    >
      <DialogTitle id="alert-dialog-title">
        Update Question Game
      </DialogTitle>
      <DialogContent className="question-edit-modal-cont">
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          {
            question?.question.map((item) => (
              <div className="question-edit-modal-input" key={Math.random()}>
                <TextField
                  id="outlined-basic"
                  label={`Question name ${item.language}`}
                  defaultValue={item.question}
                  variant="outlined"
                  onChange={(e) => {
                    handleSetQuestions(e.target.value, item.language);
                  }}
                  // onFocus={(e) => console.log(e, 'eeedsa')}
                  // onBlurCapture={(e) => console.log(e, 'dsadsadadsa')}
                  type="text"
                />
              </div>
            ))
          }
          <div className="questions-edit-modal-footer">
            <TextField inputRef={categoryInputRef} defaultValue={question?.category} id="outlined-basic" label="Category" variant="outlined" />
            <FormControlLabel inputRef={isPremiumCheckboxRef} control={<Checkbox defaultChecked={question?.ispremium} />} label="Is Premium" />
            <FormControlLabel inputRef={visibleCheckboxRef} control={<Checkbox defaultChecked={question?.visible} />} label="Visible" />
            <FormControlLabel onChange={(e) => setChangeImages(e.target.checked)} control={<Checkbox />} label="Change images" />
            <div className="questions-edit-modal-footer-images">
              {question?.question[0]?.images?.map((item) => <img src={item} alt="questions-edit-modal-footer-images" />)}
            </div>
            <input disabled={!changeImages} multiple ref={fileInputRef} type="file" />
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
