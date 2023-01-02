import React from 'react';
import TagIcon from '@mui/icons-material/Tag';
import PageHeader from '../../components/PageHeader';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { qurbanCols } from '../../constants/DatatableSource';
import { getQurban } from '../../app/api';

const Qurban = () => {
  const {
    isLoading,
    isError,
    error,
    data: incomeQurban,
  } = useQuery('qurban', getQurban);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else {
    content = (
      <DataGrid
        className='datagrid'
        rows={incomeQurban}
        columns={qurbanCols}
        hideFooterPagination
      />
    );
  }
  return (
    <div className='content__main'>
      <div className='content__title'>
        <PageHeader
          title='Data Dana Qurban'
          subTitle='Keuangan Masjid At-Tiin'
          icon={<TagIcon fontSize='large' />}
        />
      </div>
      <div className='content__table'>{content}</div>
    </div>
  );
};

export default Qurban;
