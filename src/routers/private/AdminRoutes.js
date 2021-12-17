
// Hooks
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Router
import {
   Navigate,
   Route,
   Routes,
} from 'react-router-dom';

// Actions
import { startLoadingTechnologies } from 'actions/admin/technologies';
import { startLoadingSoftSkills } from 'actions/admin/softskills';

// Components
import SideBar from 'components/navbar/SideBar';

import SoftskillsScreen from 'components/admin/softskills/SoftskillsScreen';



import TechnologiesScreen from 'components/admin/technologies/TechnologiesScreen';
import AddNewTech from 'components/admin/technologies/AddNewTech';
import EditTech from 'components/admin/technologies/EditTech';

import { Stack } from '@chakra-ui/react';



const AdminRoutes = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(startLoadingTechnologies());
      dispatch(startLoadingSoftSkills());
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
               path='technologies/edit/:id'
               element={<EditTech />  }
            />




            <Route
               path='soft-skills'
               element={<SoftskillsScreen />}
            />

            <Route
               path='soft-skills/new'
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
