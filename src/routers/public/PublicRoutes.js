import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoutes = ({ children }) => {
   
   const { isAuthenticated, redirect } = useSelector(
      (state) => state.auth
   );

   if (isAuthenticated) {     
      return <Navigate to={redirect} />;
   }

   return children;
};

PublicRoutes.propTypes = {
   children: PropTypes.element
};


export default PublicRoutes;
