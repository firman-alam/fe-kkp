import React, { useState } from 'react';
import './Income.scss';
// react query
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
} from '../../app/api';
// MUI Components
import { Toolbar } from '@mui/material/';
import { DataGrid } from '@mui/x-data-grid';
// MUI Icons
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PageHeader from '../../components/PageHeader';
// components
import { incomeCols } from '../../constants/DatatableSource';
import Popup from '../../components/PopUp';
import IncomeForm from './IncomeForm';
import Controls from '../../components/controls/Control';
import DeleteAlert from '../../components/DeleteAlert';

const Income = () => {
  // useState
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [deleteVal, setDeleteVal] = useState();
  const [openDelete, setOpenDelete] = useState(false);

  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: dataIncome,
  } = useQuery('income', getIncome);

  console.log(dataIncome);
  // react query mutation
  const addIncomeMutation = useMutation(createIncome, {
    onSuccess: () => {
      queryClient.invalidateQueries('income');
    },
  });
  const updateIncomeMutation = useMutation(updateIncome, {
    onSuccess: () => {
      queryClient.invalidateQueries('income');
    },
  });
  const deleteIncomeMutation = useMutation(deleteIncome, {
    onSuccess: () => {
      queryClient.invalidateQueries('income');
    },
  });

  // add or edit
  const addOrEdit = (data) => {
    console.log(data);
    if (!data.id) addIncomeMutation.mutate(data);
    if (data.id) updateIncomeMutation.mutate(data);
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
      headerName: 'Action',
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
    content = <p>{error.message}</p>;
  } else {
    content = (
      <DataGrid
        className='datagrid'
        rows={dataIncome}
        columns={incomeCols.concat(actionColumn)}
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
