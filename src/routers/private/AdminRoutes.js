import { Stack } from '@chakra-ui/react';
import React from 'react';
import {
   Navigate,
   Route,
   Routes,
} from 'react-router-dom';
import AdminScreen from '../../components/admin/AdminScreen';
import SideBar from '../../components/admin/SideBar';
import Yo from '../../components/admin/Yo';

const AdminRoutes = () => {
   return (
      <Stack 
         direction={{ base: 'column', lg:'row'}}
         w='full' 
         alignItems='flex-start'


      >
         <SideBar />

         <Routes>
            <Route
               path='/'
               element={
                  <div>
                     

                  </div>
               }
            />

            <Route
               path='tecnologias'
               element={<AdminScreen />}
            />

            <Route
               path='soft-skills'
               element={<Yo />}
            />

            <Route
               path='*'
               element={<Navigate to='/admin' />}
            />
         </Routes>
      </Stack>
   );
};

export default AdminRoutes;
