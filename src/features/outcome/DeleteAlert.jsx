import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useDeleteOutcomeMutation } from './outcomeApiSlice';

const DeleteAlert = ({ deleteVal, openDelete, setOpenDelete }) => {
  const [deleteOutcome] = useDeleteOutcomeMutation();

  return (
    <Dialog
      open={openDelete}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Apakah anda yakin menghapus item ini?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpenDelete(false);
          }}
        >
          Tidak
        </Button>
        <Button
          onClick={() => {
            setOpenDelete(false);
            deleteOutcome(deleteVal);
          }}
          autoFocus
        >
          Ya
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAlert;
