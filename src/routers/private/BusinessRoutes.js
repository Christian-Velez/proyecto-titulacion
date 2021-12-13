

import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const BusinessRoutes = () => {
   return (
      <Routes>
         <Route 
            path='/'
            element={<p> Bienvenida empresa </p>}
         />

         <Route
            path='*'
            element={<Navigate to='/bus' />}
         />
      </Routes>
   )
}

export default BusinessRoutes
