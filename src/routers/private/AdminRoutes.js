import { Stack } from '@chakra-ui/react';
import React from 'react';
import {
   Navigate,
   Route,
   Routes,
} from 'react-router-dom';
import SideBar from '../../components/navbar/SideBar';

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
                  <p> Inicio, bienvenido administrador </p>
               }
            />

            <Route
               path='tecnologias'
               element={<p> Tecnologías </p>}
            />

            <Route
               path='soft-skills'
               element={<p> Soft skills</p>}
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
