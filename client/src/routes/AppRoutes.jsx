import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import Home from '@/pages/Home';
import OrderNow from '@/pages/OrderNow';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.ORDER_NOW} element={<OrderNow />} />
    </Routes>
  );
}
