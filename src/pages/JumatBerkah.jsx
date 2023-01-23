import TagIcon from '@mui/icons-material/Tag';
import PageHeader from '../components/PageHeader';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';

import { useGetCategoryQuery } from '../features/category/categoryApiSlice';
import { tableCols } from '../constants/DatatableSource';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const JumatBerkah = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetCategoryQuery('jumat_berkah');

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Oh no, there was an error {error}</p>;
  } else if (isSuccess) {
    content = (
      <DataGrid
        className='datagrid'
        rows={data}
        columns={tableCols}
        hideFooterPagination
        components={{ Toolbar: CustomToolbar }}
      />
    );
  }

  return (
    <div className='content__main'>
      <div className='content__title'>
        <PageHeader
          title='Data Dana Jumat Berkah'
          subTitle='Keuangan Masjid At-Tiin'
          icon={<TagIcon fontSize='large' />}
        />
      </div>
      <div className='content__table'>{content}</div>
    </div>
  );
};

export default JumatBerkah;
