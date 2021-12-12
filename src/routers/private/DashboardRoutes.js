import React from 'react';
import {
   Navigate,
   Route,
   Routes,
} from 'react-router-dom';
import AdminScreen from '../../components/admin/AdminScreen';

const DashboardRoutes = () => {
   return (
      <div>
         <Routes>
            <Route
               path='/admin'
               element={<AdminScreen />}
            />

            <Route
               path='/*'
               element={<Navigate to='/admin' />}
            />
         </Routes>
      </div>
   );
};

export default DashboardRoutes;
