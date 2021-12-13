

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'





const PrivateRoutes = ({ children, requiredRoles }) => {
   const { 
      isAuthenticated, 
      role
   } = useSelector(state => state.auth)
   
   const userHasRequiredRole = requiredRoles.includes(role);
   console.log(role, userHasRequiredRole)



   // Si no esta autenticado lo saca de una
   if(!isAuthenticated) {
      console.log('IS NOT AUT');
      return <p> Q PASO WEEEEEEEE JAJA</p>
   }

   // Si la ruta requiere un rol
   if(requiredRoles && !userHasRequiredRole){
      return <h1> access denied pa</h1>
   }

   // Si paso los dos filtros le regreso el children
   return children
}


PrivateRoutes.propTypes = {
   children: PropTypes.element.isRequired,
   requiredRoles: PropTypes.array,
}


export default PrivateRoutes
