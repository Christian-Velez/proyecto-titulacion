import React, { useEffect } from 'react';

import MainInfo from '../../MainInfo';
import Body from './Body';

import {
   VStack,
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditProfileButton from 'components/EditProfileButton';


const DeveloperProfile = () => {
   const navigate = useNavigate();
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);
   
   const handleEditProfile = () => {
      navigate('./edit');
   };


   const devInfo = useSelector((state) => state.devInfo);

   return (
      <VStack
         padding={{ base: 10, lg: 30, xl: 40 }}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
      >
         {/* Header -> Información principal del desarrollador */}
         <MainInfo userInfo={devInfo}/>



         {/*Boton para editar el perfil */}
         <EditProfileButton handleEditProfile={handleEditProfile}/>

         {/* Body -> Información extra: calificaciones, proyectos, etc*/}
         <Body />



      </VStack>
   );
};

export default DeveloperProfile;
