import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Control';

const categoryItems = [
  { id: 'kas', title: 'Kas' },
  { id: 'kajian', title: 'Kajian' },
  { id: 'zakat', title: 'Zakat' },
  { id: 'qurban', title: 'Qurban' },
  { id: 'dauroh', title: 'Dauroh' },
];

const initialFormValues = {
  nama: '',
  nominal_tunai: '',
  nominal_transfer: '',
  keterangan: '',
  kategori: 'Kas',
  tanggal: new Date(),
};

const IncomeForm = ({ addOrEdit, recordForEdit }) => {
  const { values, setValues, errors, handleInputChange, resetForm } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEdit(values);
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid
          item
          sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <Controls.Input
            name='nama'
            label='Nama'
            type='text'
            value={values.nama}
            onChange={handleInputChange}
            error={errors.nama}
          />
          <Controls.Input
            name='nominal_tunai'
            label='Tunai'
            type='number'
            value={values.nominal_tunai}
            onChange={handleInputChange}
            error={errors.tunai}
          />
          <Controls.Input
            name='nominal_transfer'
            label='Transfer'
            type='number'
            value={values.nominal_transfer}
            onChange={handleInputChange}
            error={errors.transfer}
          />
          <Controls.Input
            name='keterangan'
            label='Keterangan'
            type='text'
            value={values.keterangan}
            onChange={handleInputChange}
            error={errors.keterangan}
          />
          <Controls.Select
            name='kategori'
            label='Kategori'
            options={categoryItems}
            value={values.kategori}
            onChange={handleInputChange}
            error={errors.kategori}
          />
          <Controls.DatePicker
            name='tanggal'
            label='Tanggal'
            value={values.tanggal}
            onChange={handleInputChange}
            error={errors.tanggal}
          />
          <div>
            <Controls.ButtonX
              type='submit'
              text='Submit'
              variant='outlined'
              color='primary'
            />
            <Controls.ButtonX
              text='Reset'
              color='error'
              variant='outlined'
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default IncomeForm;
