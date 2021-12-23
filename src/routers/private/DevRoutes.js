import { Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
   Navigate,
   Route,
   Routes,
} from 'react-router-dom';
import SideBar from 'components/navbar/SideBar';
import WelcomeDeveloper from 'components/developer/WelcomeDeveloper';
import { useDispatch } from 'react-redux';
import { startSettingDevInfo } from 'actions/developer/user';
import LoadingScreen from 'components/LoadingScreen';
import DeveloperProfile from 'components/developer/profile/DeveloperProfile';
import EditDeveloperProfile from 'components/developer/profile/edit/EditDeveloperProfileScreen';

const DevRoutes = () => {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      dispatch(startSettingDevInfo(setIsLoading));
   }, []);


   return (
      <Stack
         direction={{ base: 'column', lg: 'row' }}
         w='full'
         alignItems='flex-start'
         className='animate__animated animate__fadeIn animate__faster'
         
         
         wordBreak='break-word'
      >
         <SideBar />

         {
            isLoading
            ? <LoadingScreen />
            : (
            <Routes>
            
               <Route path='/' element={ <WelcomeDeveloper /> } />
            
               <Route path='profile' element={ <DeveloperProfile /> } />
               <Route path='profile/edit' element={ <EditDeveloperProfile /> } />


               <Route path='jobs' element={ <p> Aqui van los empleos </p> } />

               <Route path='technologies' element={ <p>Aqui van las tecnologías </p> } />

               <Route path='applications' element={ <p> Aqui van las postulaciones </p> } />

               <Route path='messages' element={ <p>Aqui va el chat </p> } />

               <Route path='search' element={ <p> Aqui va el buscador de empresas </p> } />

               <Route path='*' element={ <Navigate to='/dev' /> }  />
            
            
            
            </Routes>
            )

         }

      </Stack>
   );
};

export default DevRoutes;
