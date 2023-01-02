import React from 'react';
import TagIcon from '@mui/icons-material/Tag';
import PageHeader from '../../components/PageHeader';
import { useQuery } from 'react-query';
import { DataGrid } from '@mui/x-data-grid';
import { kajianCols } from '../../constants/DatatableSource';
import { getKajian } from '../../app/api';

const Kajian = () => {
  const {
    isLoading,
    isError,
    error,
    data: incomeKajian,
  } = useQuery('kajian', getKajian);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else {
    content = (
      <DataGrid
        className='datagrid'
        rows={incomeKajian}
        columns={kajianCols}
        hideFooterPagination
      />
    );
  }

  return (
    <div className='content__main'>
      <div className='content__title'>
        <PageHeader
          title='Data Dana Kajian'
          subTitle='Keuangan Masjid At-Tiin'
          icon={<TagIcon fontSize='large' />}
        />
      </div>
      <div className='content__table'>{content}</div>
    </div>
  );
};

export default Kajian;
