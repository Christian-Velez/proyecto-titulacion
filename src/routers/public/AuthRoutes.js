import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginScreen from '../../components/login/LoginScreen';
import BusinessRegister from '../../components/register/BusinessRegister';

const AuthRoutes = () => {
   // Route: /auth/${path}

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

            <Route
               path='/*'
               element={<Navigate to='login'/>}
               />
         </Routes>
      </div>
   );
};

export default AuthRoutes;
