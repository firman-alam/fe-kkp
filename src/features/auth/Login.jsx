import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import { Button, TextField } from '@mui/material';

import usePersist from '../../hooks/usePersist';

import './Login.scss';
import attin from '../../assets/attiin.png';

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      localStorage.setItem('userToken', accessToken);
      setUsername('');
      setPassword('');
      navigate('/');
    } catch (error) {
      if (!error.status) {
        setErrMsg('No Server Response');
      } else if (error.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (error.status === 401) {
        setErrMsg('Unauthorized!');
      } else {
        setErrMsg(error.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const errClass = errMsg ? 'errmsg' : 'offscreen';

  if (isLoading) return <p>Loading...</p>;

  const content = (
    <section className='login__main'>
      <header className='form__header'>
        <img src={attin} alt='attiin' />
        <h1>Keuangan </h1>
        <h2>Masjid At-Tiin Asembaris</h2>
        <p ref={errRef} className={errClass} aria-live='assertive'>
          {errMsg}
        </p>
      </header>
      <main className='form__body'>
        <form className='form' onSubmit={handleSubmit}>
          <TextField
            label='Nama'
            id='username'
            variant='standard'
            type='text'
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete='off'
            autoFocus
            required
          />
          <TextField
            label='Kata Sandi'
            id='password'
            variant='standard'
            type='password'
            onChange={handlePwdInput}
            value={password}
            required
          />

          <Button type='submit' variant='contained'>
            MASUK
          </Button>
        </form>
      </main>
    </section>
  );
  return content;
};

export default Login;
