import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const DevRoutes = () => {
   return (
      <Routes>
         <Route
            path='/'
            element={<p>Bienvenido desarrollador </p>}
         />

         <Route
            path='*'
            element={<Navigate to='/dev'/>}

         />
      </Routes>
   )
}

export default DevRoutes
