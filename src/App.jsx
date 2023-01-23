import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from 'react-router-dom';
import Index from './routes/Index';
import Root from './routes/Root';
import Login from './features/auth/Login';
import Income from './features/income/Income';
import Outcome from './features/outcome/Outcome';
import BaktiSosial from './pages/BaktiSosial';
import Dauroh from './pages/Dauroh';
import Kas from './pages/Kas';
import Kajian from './pages/Kajian';
import Ifthor from './pages/Ifthor';
import Janaiz from './pages/Janaiz';
import Rq from './pages/Rq';
import JumatBerkah from './pages/JumatBerkah';
import ProtectedRoute from './routes/protectedRoute';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Root />}>
          <Route index element={<Index />} />
          <Route path='pemasukan' element={<Income />} />
          <Route path='pengeluaran' element={<Outcome />} />
          <Route path='dauroh' element={<Dauroh />} />
          <Route path='kas' element={<Kas />} />
          <Route path='kajian' element={<Kajian />} />
          <Route path='ifthor' element={<Ifthor />} />
          <Route path='janaiz' element={<Janaiz />} />
          <Route path='rumahquran' element={<Rq />} />
          <Route path='jumatberkah' element={<JumatBerkah />} />
          <Route path='baktisosial' element={<BaktiSosial />} />
        </Route>
      </Route>

      <Route path='/masuk' element={<Login />} />
    </>
  )
);

function App() {
  return <div></div>;
}

export default App;
