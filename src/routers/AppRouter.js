import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
   Route,
   Routes,
   BrowserRouter,
   Navigate,
} from 'react-router-dom';
import { types } from '../types/types';

import PrivateRoutes from './private/PrivateRoutes';
import PublicRoutes from './public/PublicRoutes';

import { ROLE } from '../types/roles';

import LoginScreen from '../components/login/LoginScreen';
import RegisterScreen from '../components/register/RegisterScreen';

import AdminRoutes from './private/AdminRoutes';
import DevRoutes from './private/DevRoutes';
import BusinessRoutes from './private/BusinessRoutes';

const AppRouter = () => {
   /*
      IDEA PARA PROTEGER RUTAS
      
      Cuando se cargue X componente, hacer una peticion al backend
      donde le mando el token que saco de localStorage

      Lo que me regrese la API: true o false
      Lo guardo en algun lado (tal vez redux) y a partir de eso
      hago la comprobacion de si puede acceder a una ruta o no



   */

   const dispatch = useDispatch();
   useEffect(() => {
      const logged =
         localStorage.getItem('logged');

      // Le mando el token al API....

      // Lo que me regrese lo meto en el usuario
      if (logged) {
         dispatch({
            type: types.login,
            //payload: lo que me regrese el API
         });
      }
   }, [dispatch]);

   return (
      <BrowserRouter>
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
                     requiredRoles={[ROLE.Developer]}
                  >
                     <DevRoutes />
                  </PrivateRoutes>
               }
               
            />

            {/*Rutas exclusivas para empresas */}
            <Route
               path='bus/*'
               element={
                  <PrivateRoutes
                     requiredRoles={[ROLE.Business]}
                  >
                     <BusinessRoutes />
                  </PrivateRoutes>
               
               
               }
            />
         </Routes>
      </BrowserRouter>
   );
};

export default AppRouter;
