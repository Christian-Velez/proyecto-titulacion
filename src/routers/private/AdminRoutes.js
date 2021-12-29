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
import WelcomeAdmin from 'components/admin/WelcomeAdmin';

import SoftskillsScreen from 'components/admin/softskills/SoftskillsScreen';
import AddNewSoft from 'components/admin/softskills/AddNewSoft';
import EditSoft from 'components/admin/softskills/EditSoft';

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
            <Route path='/' element={ <WelcomeAdmin /> } />

            <Route path='technologies' element={<TechnologiesScreen />} />
            <Route path='technologies/new' element={<AddNewTech /> } />
            <Route path='technologies/edit/:id' element={<EditTech /> } />

            <Route path='soft-skills' element={<SoftskillsScreen /> } />
            <Route path='soft-skills/new' element={<AddNewSoft /> } />
            <Route path='soft-skills/edit/:id' element={<EditSoft /> } />


            <Route path='*' element={<Navigate to='/admin' /> } />
         </Routes>
      </Stack>
   );
};

export default AdminRoutes;
