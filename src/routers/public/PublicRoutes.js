import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoutes = ({ children }) => {
   const { isAuthenticated, redirect } = useSelector(
      (state) => state.auth
   );

   if (isAuthenticated) {     
      return <Navigate to={redirect} />;
   }

   return children;
};

export default PublicRoutes;
