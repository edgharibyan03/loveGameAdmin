import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { toast } from 'react-toastify';
import { createTransaction } from 'src/store/Slices/users';
import UsersItem from './UsersItem';
import './style.css';

const currencies = [
  {
    label: 'Gold',
    id: 0,
  },
  {
    label: 'Diamond',
    id: 1,
  },
];

export default function UsersList({ list }) {
  const dispatch = useDispatch();

  const [currentUserId, setCurrentUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState(currencies[0]);

  const moneyInputRef = useRef(null);

  console.log(currency, 'currentUserId');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetCurrentUserId = useCallback((id) => {
    setCurrentUserId(id);
    handleClickOpen();
  }, []);

  const handleCreateTransaction = useCallback(() => {
    const money = moneyInputRef.current?.value;
    if (money && currency) {
      dispatch(createTransaction({
        count: +moneyInputRef.current.value,
        income: true,
        currency: currency.id,
        userId: currentUserId,
      }));
      handleClose();
    } else {
      toast.warn('All fields are required');
    }
    // console.log(moneyInputRef.current, currentUserId, currency, '3210320130210');
  }, [currentUserId, currency, moneyInputRef]);

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Money</th>
          </tr>
        </thead>
        <tbody>
          {
            list?.map((item) => (
              <UsersItem
                firstName={item.firstName}
                lastName={item.lastName}
                id={item.id}
                handleSetCurrentUserId={handleSetCurrentUserId}
                key={item.id}
              />
            ))
          }
        </tbody>
      </table>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Add money
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            inputRef={moneyInputRef}
            style={{ marginTop: '10px', marginBottom: '20px' }}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={currencies}
            defaultValue={currencies[0]}
            onChange={(_, value) => setCurrency(value)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>Disagree</Button>
          <Button variant="contained" onClick={handleCreateTransaction} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
