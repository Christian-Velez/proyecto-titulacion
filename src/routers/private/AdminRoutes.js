import { Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import {
   Navigate,
   Route,
   Routes,
} from 'react-router-dom';
import SoftskillsScreen from 'components/admin/SoftskillsScreen';
import TechnologiesScreen from 'components/admin/TechnologiesScreen';
import SideBar from 'components/navbar/SideBar';
import AddNewTech from 'components/admin/AddNewTech';


import { startLoadingTechnologies } from 'actions/admin/technologies';
import { useDispatch } from 'react-redux';

const AdminRoutes = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(startLoadingTechnologies());
   }, []);



   return (
      <Stack 
         direction={{ base: 'column', lg:'row'}}
         w='full' 
         alignItems='flex-start'
         className='animate__animated animate__fadeIn animate__faster'
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
               path='technologies'
               element={<TechnologiesScreen />}
            />

            <Route
               path='technologies/new'
               element={<AddNewTech /> }
            />



            <Route
               path='soft-skills'
               element={<SoftskillsScreen />}
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
