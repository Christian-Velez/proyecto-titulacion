import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginScreen from '../../components/login/LoginScreen';
import BusinessRegister from '../../components/register/BusinessRegister';

const AuthRoutes = () => {
   return (
      <div>
         <Routes>
            <Route
               path='login'
               element={<LoginScreen />}
            />
            <Route
               path='register'
               element={<BusinessRegister />}
            />
         </Routes>
      </div>
   );
};

export default AuthRoutes;
