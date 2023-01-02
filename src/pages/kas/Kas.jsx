import React from 'react';
import TagIcon from '@mui/icons-material/Tag';
import PageHeader from '../../components/PageHeader';
import { kasCols } from '../../constants/DatatableSource';
import { getKas } from '../../app/api';
import { useQuery } from 'react-query';
import { DataGrid } from '@mui/x-data-grid';

const Kas = () => {
  const {
    isLoading,
    isError,
    error,
    data: incomeKas,
  } = useQuery('kas', getKas);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else {
    content = (
      <DataGrid
        className='datagrid'
        rows={incomeKas}
        columns={kasCols}
        hideFooterPagination
      />
    );
  }

  return (
    <div className='content__main'>
      <div className='content__title'>
        <PageHeader
          title='Data Kas Masjid'
          subTitle='Keuangan Masjid At-Tiin'
          icon={<TagIcon fontSize='large' />}
        />
      </div>
      <div className='content__table'>{content}</div>
    </div>
  );
};

export default Kas;
