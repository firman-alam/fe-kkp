import React from 'react';
import TagIcon from '@mui/icons-material/Tag';
import PageHeader from '../../components/PageHeader';
import { daurohCols } from '../../constants/DatatableSource';
import { DataGrid } from '@mui/x-data-grid';
import { getDauroh } from '../../app/api';
import { useQuery } from 'react-query';

const Dauroh = () => {
  const {
    isLoading,
    isError,
    error,
    data: incomeDauroh,
  } = useQuery('dauroh', getDauroh);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else {
    content = (
      <DataGrid
        className='datagrid'
        rows={incomeDauroh}
        columns={daurohCols}
        hideFooterPagination
      />
    );
  }
  return (
    <div className='content__main'>
      <div className='content__title'>
        <PageHeader
          title='Data Dana Dauroh'
          subTitle='Keuangan Masjid At-Tiin'
          icon={<TagIcon fontSize='large' />}
        />
      </div>
      <div className='content__table'>{content}</div>
    </div>
  );
};

export default Dauroh;
