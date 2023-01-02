import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../utils/user/UserAction';
import attin from '../../assets/attiin.png';
import './Login.scss';

const Login = () => {
  const { loading, userToken } = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      navigate('/');
    }
  }, [navigate, userToken]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
    console.log(data);
  };

  return (
    <main className='login__main'>
      <div className='login__form'>
        <div className='form__header'>
          <img src={attin} alt='attiin' />
          <h1>Keuangan </h1>
          <h2>Masjid At-Tiin Asembaris</h2>
        </div>
        <div className='form__body'>
          <form onSubmit={handleSubmit(submitForm)}>
            <TextField
              label='Nama'
              id='username'
              variant='standard'
              type='text'
              {...register('username')}
              required
            />
            <TextField
              label='Password'
              id='password'
              variant='standard'
              type='password'
              {...register('password')}
              required
            />
            <Button type='submit' variant='contained' disabled={loading}>
              MASUK
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
