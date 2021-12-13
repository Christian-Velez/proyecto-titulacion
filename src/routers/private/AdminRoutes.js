import { HStack } from '@chakra-ui/react';
import React from 'react';
import {
   Navigate,
   Route,
   Routes,
   useLocation,
} from 'react-router-dom';
import AdminScreen from '../../components/admin/AdminScreen';
import SideBar from '../../components/admin/SideBar';
import Yo from '../../components/admin/Yo';

const AdminRoutes = () => {
   return (
      <HStack w='full' alignItems='flex-start'>
         <SideBar />

         <Routes>
            <Route
               path='/'
               element={
                  <div>

                     <HStack bgColor='red.50' w='80vw' h='100vh'/>
                     <HStack  bgColor='red.50' w='80vw' h='100vh'/>
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
      </HStack>
   );
};

export default AdminRoutes;
