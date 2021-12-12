import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
   Route,
   Routes,
   BrowserRouter,
} from 'react-router-dom';
import { types } from '../types/types';

import DashboardRoutes from './private/DashboardRoutes';
import PrivateRoutes from './private/PrivateRoutes';
import AuthRoutes from './public/AuthRoutes';
import PublicRoutes from './public/PublicRoutes';

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

   console.log('AppRouter');

   useEffect(() => {
      const logged = localStorage.getItem('logged');

      // Le mando el token al API....

      // Lo que me regrese lo meto en el usuario
      if(logged) {
         dispatch({
            type: types.login
            //payload: lo que me regrese el API
         })
      }
   }, [dispatch])



   return (
      <BrowserRouter>
         <div>
            <Routes>
               
               
               {/* Publico */}
               <Route
                  path='/auth/*'
                  element={
                     <PublicRoutes>
                        <AuthRoutes />
                     </PublicRoutes>
                  }
               />

               {/* Privado */}
               <Route
                  path='/*'
                  element={
                     <PrivateRoutes>
                        <DashboardRoutes />
                     </PrivateRoutes>
                  }
               />

              
            </Routes>
         </div>
      </BrowserRouter>
   );
};

export default AppRouter;
