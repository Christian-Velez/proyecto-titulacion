
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminScreen from '../../components/admin/AdminScreen'



const DashboardRoutes = () => {
   return (
      <div>
         <Routes>
          
            <Route path='/' element={<AdminScreen />} />
         </Routes>
      </div>
   )
}

export default DashboardRoutes
