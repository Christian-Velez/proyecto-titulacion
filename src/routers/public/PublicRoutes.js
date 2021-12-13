

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const PublicRoutes = ({ children }) => {
   const { isAuthenticated } = useSelector(state => state.auth);



   return isAuthenticated
   ? <Navigate to='/admin' />
   : children
}

export default PublicRoutes