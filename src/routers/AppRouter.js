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


const AdminRoutes = React.lazy(() => import('./private/AdminRoutes'));
const DevRoutes = React.lazy(() => import('./private/DevRoutes'));
const CompanyRoutes = React.lazy(() => import('./private/CompanyRoutes'));


import { generalLogout, setIsChecking, startCheckingIsTokenValid } from 'actions/auth';
import LoadingScreen from 'components/LoadingScreen';
import LandingPageScreen from 'components/landing/LandingPageScreen';

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
               exact path='/'
               element = { 
                  <PublicRoutes>
                     <LandingPageScreen />                  
                  </PublicRoutes>
               }
            />

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
               element={<Navigate to='/' />}
            />

         
            {/*  Rutas exclusivas para el admin */}
               <Route
                  path='admin/*'
                  element={
                     <PrivateRoutes
                        requiredRoles={[ROLE.Admin]}
                     >
                        <React.Suspense fallback={<LoadingScreen />}>
                           <AdminRoutes />
                        </React.Suspense>
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
                        <React.Suspense fallback={<LoadingScreen />}>
                           <DevRoutes />
                        </React.Suspense>

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
                        <React.Suspense fallback={<LoadingScreen />}>
                           <CompanyRoutes />
                        </React.Suspense>

                     </PrivateRoutes>
                  }
               />
         </Routes>
      }
      </BrowserRouter>
   );
};

export default AppRouter;
