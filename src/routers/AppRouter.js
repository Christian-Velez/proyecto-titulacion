import React from 'react';
import {
   Route,
   Routes,
   BrowserRouter,
} from 'react-router-dom';

import DashboardRoutes from './private/DashboardRoutes';
import PrivateRoutes from './private/PrivateRoutes';
import AuthRoutes from './public/AuthRoutes';
import PublicRoutes from './public/PublicRoutes';

const AppRouter = () => {
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
