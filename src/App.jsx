import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from 'react-router-dom';
import Dauroh from './pages/dauroh/Dauroh';
import Income from './pages/income/Income';
import Kajian from './pages/kajian/Kajian';
import Kas from './pages/kas/Kas';
import Login from './pages/login/Login';
import Outcome from './pages/outcome/Outcome';
import Qurban from './pages/qurban/Qurban';
import Zakat from './pages/zakat/Zakat';
import Index from './routes/Index';
import ProtectedRoute from './routes/protectedRoute';
import Root from './routes/Root';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Root />}>
          <Route index element={<Index />} />
          <Route path='pemasukan' element={<Income />} />
          <Route path='pengeluaran' element={<Outcome />} />
          <Route path='kas' element={<Kas />} />
          <Route path='qurban' element={<Qurban />} />
          <Route path='kajian' element={<Kajian />} />
          <Route path='zakat' element={<Zakat />} />
          <Route path='dauroh' element={<Dauroh />} />
        </Route>
      </Route>
      <Route path='/auth' element={<Login />} />
    </>
  )
);

function App() {
  return <div></div>;
}

export default App;
