import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { deleteIncome, deleteOutcome } from '../app/api';
import { useMutation, useQueryClient } from 'react-query';

const DeleteAlert = ({ deleteVal, openDelete, setOpenDelete }) => {
  const queryClient = useQueryClient();
  const deleteIncomeMutation = useMutation(deleteIncome, {
    onSuccess: () => {
      queryClient.invalidateQueries('income');
    },
  });
  const deleteOutcomeMutation = useMutation(deleteOutcome, {
    onSuccess: () => {
      queryClient.invalidateQueries('outcome');
    },
  });

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
            deleteIncomeMutation.mutate(deleteVal);
            deleteOutcomeMutation.mutate(deleteVal);
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
