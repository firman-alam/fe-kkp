import './Root.scss';
import { Link, Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { Dashboard, Payment, Tag, Logout } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SidebarList from '../components/SidebarList';
import attiin from '../assets/attiin.png';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';

const Root = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate('/masuk');
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  return (
    <main>
      <div className='sidebar'>
        <div className='top'>
          <img src={attiin} alt='attiin' />
        </div>

        <div className='center'>
          <ul>
            <Typography className='title'>Menu Utama</Typography>
            {/* <p className='title'>Menu Utama</p> */}
            <Link to='/'>
              <SidebarList Icon={Dashboard} title='Dashboard' />
            </Link>
            <Link to='/pemasukan'>
              <SidebarList Icon={Payment} title='Data Pemasukan' />
            </Link>
            <Link to='/pengeluaran'>
              <SidebarList Icon={Payment} title='Data Pengeluaran' />
            </Link>
            <p className='title'>Kategori</p>
            <Link to='/baktisosial'>
              <SidebarList Icon={Tag} title='Bakti Sosial' />
            </Link>
            <Link to='/dauroh'>
              <SidebarList Icon={Tag} title='Dauroh' />
            </Link>
            <Link to='/ifthor'>
              <SidebarList Icon={Tag} title='Ifthor' />
            </Link>
            <Link to='/janaiz'>
              <SidebarList Icon={Tag} title='Janaiz' />
            </Link>
            <Link to='/kas'>
              <SidebarList Icon={Tag} title='Kas Masjid' />
            </Link>
            <Link to='/kajian'>
              <SidebarList Icon={Tag} title='Kajian' />
            </Link>

            <Link to='/jumatberkah'>
              <SidebarList Icon={Tag} title='Jumat Berkah' />
            </Link>
            <Link to='/rumahquran'>
              <SidebarList Icon={Tag} title='Rumah Quran' />
            </Link>

            <p className='title'>Akun</p>
            <Button
              endIcon={<Logout />}
              onClick={sendLogout}
              variant='outlined'
              color='error'
            >
              Keluar
            </Button>
          </ul>
        </div>
      </div>
      <div
        id='details'
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </main>
  );
};

export default Root;
