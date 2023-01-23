import React, { useState } from 'react';
// rtk query
import {
  useAddNewOutcomeMutation,
  useGetOutcomeQuery,
  useUpdateOutcomeMutation,
} from './outcomeApiSlice';
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
import PageHeader from '../../components/PageHeader';
import Popup from '../../components/PopUp';
import Controls from '../../components/controls/Control';
import { outcomeCols } from '../../constants/DatatableSource';
import OutcomeForm from './OutcomeForm';
import DeleteAlert from './DeleteAlert';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const Outcome = () => {
  // useState
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [deleteVal, setDeleteVal] = useState();
  const [openDelete, setOpenDelete] = useState(false);

  // rtk query
  const {
    data: outcome,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOutcomeQuery();
  const [addOutcome] = useAddNewOutcomeMutation();
  const [updateOutcome] = useUpdateOutcomeMutation();

  // add or edit
  const addOrEdit = (data) => {
    if (!data.id) addOutcome(data);
    if (data.id) updateOutcome(data);
    // resetForm
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  // Open Pop Up Delete
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
              color='primary'
              variant='outlined'
              onClick={() => {
                openInPopup(params.row);
              }}
            >
              <EditOutlinedIcon fontSize='small' />
            </Controls.ActionButton>
            <Controls.ActionButton
              color='secondary'
              variant='outlined'
              onClick={() => {
                openDeletePopUp(params.row.id);
              }}
            >
              <CloseIcon fontSize='small' />
            </Controls.ActionButton>
          </>
        );
      },
    },
  ];

  // content
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Oh no, there was an error {error}</p>;
  } else if (isSuccess) {
    content = (
      <DataGrid
        className='datagrid'
        rows={outcome}
        columns={outcomeCols.concat(actionColumn)}
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
          title='Tambah Data Pengeluaran'
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
        <OutcomeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
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

export default Outcome;
