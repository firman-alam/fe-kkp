import './Root.scss';
import { Link, Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { Dashboard, Payment, Tag, Logout } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../utils/user/userSlice';
import SidebarList from '../components/SidebarList';
import attiin from '../assets/attiin.png';

const Root = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            <Link to='/kas'>
              <SidebarList Icon={Tag} title='Kas Masjid' />
            </Link>
            <Link to='/kajian'>
              <SidebarList Icon={Tag} title='Kajian' />
            </Link>
            <Link to='/dauroh'>
              <SidebarList Icon={Tag} title='Dauroh' />
            </Link>
            <Link to='/qurban'>
              <SidebarList Icon={Tag} title='Qurban' />
            </Link>
            <Link to='/zakat'>
              <SidebarList Icon={Tag} title='Zakat' />
            </Link>
            <p className='title'>User</p>
            <li
              onClick={() => {
                dispatch(logout());
                navigate('/auth');
              }}
            >
              <Logout className='icon' />
              <span>Log Out</span>
            </li>
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
