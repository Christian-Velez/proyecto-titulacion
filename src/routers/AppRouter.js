import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   Route,
   Routes,
   BrowserRouter,
   Navigate,
} from 'react-router-dom';

import PrivateRoutes from './private/PrivateRoutes';
import PublicRoutes from './public/PublicRoutes';

import { ROLE } from 'types/roles';

import LoginScreen from 'components/login/LoginScreen';
import RegisterScreen from 'components/register/RegisterScreen';

import AdminRoutes from './private/AdminRoutes';
import DevRoutes from './private/DevRoutes';
import CompanyRoutes from './private/CompanyRoutes';
import { generalLogout, setIsChecking, startCheckingIsTokenValid } from 'actions/auth';

const AppRouter = () => {
   const dispatch = useDispatch();
   const { isChecking } = useSelector(state => state.auth);

   
   useEffect(() => {
      const auth = JSON.parse(localStorage.getItem('auth'));
      const { token } = auth || {};

      if(token) {
         dispatch(startCheckingIsTokenValid(auth));
      }
      else{
         dispatch(generalLogout());
         dispatch(setIsChecking(false));
      }

   }, [dispatch]);

   return (
      <BrowserRouter>
      {
         !isChecking &&
         
         <Routes>
            {/*  Rutas publicas */}


            <Route
               path='login'
               element={
                  <PublicRoutes>
                     <LoginScreen />
                  </PublicRoutes>
               }
            />

            <Route
               path='register'
               element={
                  <PublicRoutes>
                     <RegisterScreen />
                  </PublicRoutes>
               }
            />

            <Route
               path='*'
               element={<Navigate to='/login' />}
            />

            {/*  Rutas exclusivas para el admin */}
            <Route
               path='admin/*'
               element={
                  <PrivateRoutes
                     requiredRoles={[ROLE.Admin]}
                  >
                     <AdminRoutes />
                  </PrivateRoutes>
               }
            />

            {/*Rutas exclusivas para desarrolladores */}
            <Route
               path='dev/*'
               element={
                  <PrivateRoutes
                     requiredRoles={[
                        ROLE.Developer,
                     ]}
                  >
                     <DevRoutes />
                  </PrivateRoutes>
               }
            />

            {/*Rutas exclusivas para empresas */}
            <Route
               path='co/*'
               element={
                  <PrivateRoutes
                     requiredRoles={[
                        ROLE.Company,
                     ]}
                  >
                     <CompanyRoutes />
                  </PrivateRoutes>
               }
            />
            
         </Routes>
      }
      </BrowserRouter>
   );
};

export default AppRouter;
