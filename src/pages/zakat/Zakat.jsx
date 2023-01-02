import React from 'react';
import TagIcon from '@mui/icons-material/Tag';
import PageHeader from '../../components/PageHeader';
import { useQuery } from 'react-query';
import { getZakat } from '../../app/api';
import { zakatCols } from '../../constants/DatatableSource';
import { DataGrid } from '@mui/x-data-grid';

const Zakat = () => {
  const {
    isLoading,
    isError,
    error,
    data: incomeZakat,
  } = useQuery('zakat', getZakat);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else {
    content = (
      <DataGrid
        className='datagrid'
        rows={incomeZakat}
        columns={zakatCols}
        hideFooterPagination
      />
    );
  }
  return (
    <div className='content__main'>
      <div className='content__title'>
        <PageHeader
          title='Data Dana Zakat'
          subTitle='Keuangan Masjid At-Tiin'
          icon={<TagIcon fontSize='large' />}
        />
      </div>
      <div className='content__table'>{content}</div>
    </div>
  );
};

export default Zakat;
