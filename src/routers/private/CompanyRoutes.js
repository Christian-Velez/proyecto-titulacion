import { Stack } from '@chakra-ui/react';
import React from 'react';
import {
   Navigate,
   Route,
   Routes,
} from 'react-router-dom';
import SideBar from '../../components/navbar/SideBar';

const CompanyRoutes = () => {
   return (
      <Stack
         direction={{ base: 'column', lg: 'row' }}
         w='full'
         alignItems='flex-start'
      >
         <SideBar />

         <Routes>
            <Route
               path='/'
               element={
                  <div
                  > Bienvenida empresa
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                  <p> Bienvenida empresa </p>
                   </div>
               }
            />

            <Route
               path='profile'
               element={
                  <p>aqui va tu perfil pa</p>
               }
            />

            <Route
               path='newjob'
               element={
                  <p>
                     aqui si quieres hacer una
                     nueva pa
                  </p>
               }
            />

            <Route
               path='myoffers'
               element={
                  <p>aqui todas tus ofertas pa</p>
               }
            />

            <Route
               path='technologies'
               element={
                  <p>Aqui van las tecnologías </p>
               }
            />

            <Route
               path='developers'
               element={
                  <p>
                     aqui van los contratados y
                     por contratar
                  </p>
               }
            />

            <Route
               path='messages'
               element={
                  <p> aqui van los mensages </p>
               }
            />

            <Route
               path='search'
               element={
                  <p>
                     Aqui va el buscador de desarrolladores
                  </p>
               }
            />

            <Route
               path='*'
               element={<Navigate to='/co' />}
            />
         </Routes>
      </Stack>
   );
};

export default CompanyRoutes;
