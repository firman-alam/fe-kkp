import React, { useState } from 'react';
// react query
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getOutcome,
  createOutcome,
  updateOutcome,
  deleteOutcome,
} from '../../app/api';
// MUI Components
import { Toolbar } from '@mui/material/';
import { DataGrid } from '@mui/x-data-grid';
// MUI Icons
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
// components
import PageHeader from '../../components/PageHeader';
import { outcomeCols } from '../../constants/DatatableSource';
import Popup from '../../components/PopUp';
import Controls from '../../components/controls/Control';
import OutcomeForm from './OutcomeForm';
import DeleteAlert from '../../components/DeleteAlert';

const Outcome = () => {
  // useState
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [deleteVal, setDeleteVal] = useState();
  const [openDelete, setOpenDelete] = useState(false);

  // react query
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: dataIncome,
  } = useQuery('outcome', getOutcome);

  // react query mutation
  const addOutcomeMutation = useMutation(createOutcome, {
    onSuccess: () => {
      queryClient.invalidateQueries('outcome');
    },
  });
  const updateOutcomeMutation = useMutation(updateOutcome, {
    onSuccess: () => {
      queryClient.invalidateQueries('outcome');
    },
  });

  // add or edit
  const addOrEdit = (data) => {
    if (!data.id) addOutcomeMutation.mutate(data);
    if (data.id) updateOutcomeMutation.mutate(data);
    // resetForm
    setRecordForEdit(null);
    setOpenPopup(false);
  };

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
      headerName: 'Action',
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
    content = <p>{error.message}</p>;
  } else {
    content = (
      <DataGrid
        className='datagrid'
        rows={dataIncome}
        columns={outcomeCols.concat(actionColumn)}
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
            text='Add New'
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
      <Popup title='Add Form' openPopup={openPopup} setOpenPopup={setOpenPopup}>
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
