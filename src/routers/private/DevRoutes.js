// Hooks
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// Router
import {
   Navigate,
   Route,
   Routes,
} from 'react-router-dom';

// Actions
import { startLoadingSoftSkills } from 'actions/admin/softskills';
import { startLoadingTechnologies } from 'actions/admin/technologies';
import { startSettingDevInfo } from 'actions/developer/user';


// Components
import SideBar from 'components/navbar/SideBar';
import LoadingScreen from 'components/LoadingScreen';

import TechnologyScreen from 'components/technologies/TechnologyScreen';
import TechnologiesSearchScreen from 'components/technologies/TechnologiesSearchScreen';

import WelcomeDeveloper from 'components/developer/WelcomeDeveloper';
import DeveloperProfile from 'components/developer/profile/DeveloperProfile';
import EditDeveloperProfile from 'components/developer/profile/edit/EditDeveloperProfileScreen';

import { Stack } from '@chakra-ui/react';




const DevRoutes = () => {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(true);

   // Carga toda la informacion inicial necesaria
   useEffect(() => {
      Promise.all([
         dispatch(startSettingDevInfo()),
         dispatch(startLoadingTechnologies()),
         dispatch(startLoadingSoftSkills()),
      ])
         .then(() => setIsLoading(false))
         .catch((err) => console.log(err));
   }, []);


   return (
      <Stack
         direction={{ base: 'column', lg: 'row' }}
         w='full'
         alignItems='flex-start'
         className='animate__animated animate__fadeIn animate__faster'
         
         
         wordBreak='break-word'
      >

         {
            isLoading
            ? <LoadingScreen />
            : (

            <>
               <SideBar />
               
               <Routes>
               
                  <Route path='/' element={ <WelcomeDeveloper /> } />
               
                  <Route path='profile' element={ <DeveloperProfile /> } />
                  <Route path='profile/edit' element={ <EditDeveloperProfile /> } />

                  <Route path='jobs' element={ <p>s</p> } />

                  <Route path='technologies' element={ <TechnologiesSearchScreen/> } />
                  <Route path='technologies/:name' element={ <TechnologyScreen/>} />

                  <Route path='applications' element={ <p> Aqui van las postulaciones </p> } />

                  <Route path='messages' element={ <p>Aqui va el chat </p> } />

                  <Route path='search' element={ <p> Aqui va el buscador de empresas </p> } />

                  <Route path='*' element={ <Navigate to='/dev' /> }  />
               
               
               
               </Routes>
            </>
            )

         }

      </Stack>
   );
};

export default DevRoutes;
