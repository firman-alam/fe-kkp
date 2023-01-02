import React from 'react';
import './Index.scss';
import Clock from '../components/Clock';
import Total from '../components/Total';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useQuery } from 'react-query';
import { getTotalIncome, getTotalOutcome } from '../app/api';
import attin from '../assets/attiin.png';

const Index = () => {
  // react query
  const {
    data: totalIncome,
    isLoading: isloadIncome,
    isError: iserrorIncome,
    error: errorIncome,
  } = useQuery('totalincome', getTotalIncome);
  const {
    data: totalOutcome,
    isLoading: isloadOutcome,
    isError: iserrorOutcome,
    error: errorOutcome,
  } = useQuery('totaloutcome', getTotalOutcome);

  // total
  let totalIn = totalIncome
    ? parseInt(totalIncome[0]?.totaltu) + parseInt(totalIncome[0]?.totaltr)
    : 0;
  let totalOut = totalOutcome
    ? parseInt(totalOutcome[0]?.totaltu) + parseInt(totalOutcome[0]?.totaltr)
    : 0;
  let total = totalIn + totalOut;

  const date = new Date();
  const today = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date);

  let content;
  if (isloadIncome) {
    content = <p>Loading...</p>;
  } else if (iserrorIncome) {
    content = <p>{errorIncome.message || errorOutcome.message}</p>;
  } else {
    content = (
      <>
        <div className='body'>
          <div className='total'>
            <Total title='Uang Masjid At-Tiin Asembaris' total={total} />
          </div>
          <div className='body__bottom'>
            <div className='income'>
              <Total
                title='Pemasukan'
                footer='Detail Pemasukan'
                total={totalIn}
                icon={<ArrowForwardOutlinedIcon fontSize='small' />}
              />
            </div>
            <div className='outcome'>
              <Total
                title='Pengeluaran'
                footer='Detail Pengeluaran'
                total={totalOut}
                icon={<ArrowForwardOutlinedIcon fontSize='small' />}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <main className='idx'>
      <div className='header'>
        <div className='left'>Selamat datang, Admin!</div>
        <div className='right'>{today}</div>
      </div>
      <div className='subheader'>
        <img src={attin} alt='attiin' />
        <div className='subheader__content'>
          <h3>Aplikasi Keuangan</h3>
          <h4>Masjid At-Tiin Asembaris</h4>
        </div>
      </div>
      {content}
      <div className='footer'>
        <div className='left'>
          Keuangan Masjid At-Tiin Asembaris &copy; {new Date().getFullYear()}
        </div>
        <div className='right'>
          Version <span>1.0</span>
        </div>
      </div>
    </main>
  );
};

export default Index;
