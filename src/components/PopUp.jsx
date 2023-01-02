import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import Controls from './controls/Control';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const DialogStyled = styled(Dialog)(({ theme }) => ({
  padding: '16px',
}));

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <DialogStyled open={openPopup} maxWidth='lg'>
      <DialogTitle sx={{ paddingRight: '0px' }}>
        <div style={{ display: 'flex' }}>
          <Typography variant='h6' component='div' style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Controls.ActionButton
            color='secondary'
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </DialogStyled>
  );
}
