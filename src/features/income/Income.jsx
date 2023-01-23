import React, { useState } from 'react';
// rtk query
import {
  useAddNewIncomeMutation,
  useGetIncomeQuery,
  useUpdateIncomeMutation,
} from './incomeApiSlice';
// MUI Components
import { Toolbar } from '@mui/material/';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
// MUI Icons
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
// components
import { incomeCols } from '../../constants/DatatableSource';
import PageHeader from '../../components/PageHeader';
import Popup from '../../components/PopUp';
import Controls from '../../components/controls/Control';
import IncomeForm from './IncomeForm';
import DeleteAlert from './DeleteAlert';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const Income = () => {
  // useState
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [deleteVal, setDeleteVal] = useState();
  const [openDelete, setOpenDelete] = useState(false);

  const {
    data: income,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetIncomeQuery();
  const [addIncome] = useAddNewIncomeMutation();
  const [updateIncome] = useUpdateIncomeMutation();

  // add or edit
  const addOrEdit = (data) => {
    console.log(data);
    if (!data.id) addIncome(data);
    if (data.id) updateIncome(data);
    // resetForm
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  // Open Delete Pop Up
  const openDeletePopUp = (id) => {
    setDeleteVal(id);
    setOpenDelete(true);
  };

  // Open Pop Up Dialog
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  // action column table
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Opsi',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Controls.ActionButton
              onClick={() => {
                openInPopup(params.row);
              }}
              color='primary'
              variant='outlined'
            >
              <EditOutlinedIcon fontSize='small' />
            </Controls.ActionButton>

            <Controls.ActionButton
              onClick={() => {
                openDeletePopUp(params.row.id);
              }}
              color='secondary'
              variant='outlined'
            >
              <CloseIcon fontSize='small' />
            </Controls.ActionButton>
          </>
        );
      },
    },
  ];

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Oh no, there was an error {error}</p>;
  } else if (isSuccess) {
    content = (
      <DataGrid
        className='datagrid'
        rows={income}
        columns={incomeCols.concat(actionColumn)}
        components={{ Toolbar: CustomToolbar }}
        hideFooterPagination
      />
    );
  }

  return (
    <div className='content__main'>
      {/* Header */}
      <div className='content__title'>
        <PageHeader
          title='Tambah Data Pemasukan'
          subTitle='Keuangan Masjid At-Tiin'
          icon={<CreditCardIcon fontSize='large' />}
        />
        <Toolbar>
          <Controls.ButtonX
            text='Tambah Baru'
            size='large'
            variant='outlined'
            startIcon={<AddIcon />}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
      </div>
      {/* Table */}
      <div className='content__table'>{content}</div>
      {/* Pop up Dialog Form */}
      <Popup
        title='Tambah Baru'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <IncomeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      {/* Pop up delete alert */}
      <DeleteAlert
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        deleteVal={deleteVal}
      />
    </div>
  );
};

export default Income;
