import React from 'react';
import {
   Navigate,
   Route,
   Routes,
   useLocation,
} from 'react-router-dom';
import AdminScreen from '../../components/admin/AdminScreen';
import Yo from '../../components/admin/Yo';

const AdminRoutes = () => {

   return (
      <Routes>
         
         <Route
            path='/'
            element={<p>Bienvenido administrador </p>}
         />

         <Route
            path='tecnologias'
            element={<AdminScreen />}
         />

         <Route 
            path='soft-skills'
            element={<Yo />}
         />

         <Route
            path='*'
            element={ <Navigate to='/admin'/>} />

         
      </Routes>
   );
};

export default AdminRoutes;
