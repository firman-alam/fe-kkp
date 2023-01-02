import React from 'react';
import { Paper, Card, Typography, styled } from '@mui/material';

const PaperHeader = styled('div')({
  padding: '16px 32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const CardIcon = styled(Card)({
  display: 'inline-block',
  padding: '16px',
  color: '#3c44b1',
});

const PaperTitle = styled('div')({
  paddingLeft: '16px',
  '& .MuiTypography-subtitle2': {
    opacity: '0.6',
  },
});

const PageHeader = ({ title, subTitle, icon }) => {
  return (
    <Paper elevation={0} square sx={{ backgroundColor: '#fdfdff' }}>
      <PaperHeader>
        <CardIcon>{icon}</CardIcon>
        <PaperTitle>
          <Typography variant='h6' component='div'>
            {title}
          </Typography>
          <Typography variant='subtitle2' component='div'>
            {subTitle}
          </Typography>
        </PaperTitle>
      </PaperHeader>
    </Paper>
  );
};

export default PageHeader;
