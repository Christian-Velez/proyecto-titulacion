import { Stack } from '@chakra-ui/react';
import React from 'react';
import {
   Navigate,
   Route,
   Routes,
} from 'react-router-dom';
import SideBar from 'components/navbar/SideBar';

const DevRoutes = () => {
   return (
      <Stack
         direction={{ base: 'column', lg: 'row' }}
         w='full'
         alignItems='flex-start'
         className='animate__animated animate__fadeIn animate__faster'

      >
         <SideBar />

         <Routes>
            <Route
               path='/'
               element={
                  <p>Bienvenido desarrollador </p>
               }
            />

            <Route
               path='profile'
               element={
                  <p>Aqui va el perfil del dev</p>
               }
            />

            <Route
               path='jobs'
               element={
                  <p> Aqui van los empleos </p>
               }
            />

            <Route
               path='technologies'
               element={
                  <p>Aqui van las tecnologías </p>
               }
            />

            <Route
               path='applications'
               element={
                  <p>
                     Aqui van las postulaciones
                  </p>
               }
            />

            <Route
               path='messages'
               element={<p>Aqui va el chat </p>}
            />

            <Route
               path='search'
               element={
                  <p>
                     Aqui va el buscador de
                     empresas
                  </p>
               }
            />
            <Route
               path='*'
               element={<Navigate to='/dev' />}
            />
         </Routes>
      </Stack>
   );
};

export default DevRoutes;
