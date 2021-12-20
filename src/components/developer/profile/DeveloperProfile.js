import React from 'react';

import MainInfo from './MainInfo';
import Body from './Body';

import {
   VStack,
   IconButton,
} from '@chakra-ui/react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const DeveloperProfile = () => {
   const navigate = useNavigate();

   
   const handleEditProfile = () => {
      navigate('./edit');
   };

   return (
      <VStack
         padding={{ base: 10, lg: 30, xl: 40 }}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
      >
         {/* Header -> Información principal del desarrollador */}
         <MainInfo />



         {/*Boton para editar el perfil */}
         <IconButton
            aria-label='Edit profile'
            variant='outline'
            fontSize='30px'
            icon={<MdOutlineModeEditOutline />}
            position='absolute'
            top={3}
            right={{ base: 10, lg: 30, xl: 40 }}
            zIndex={1000}
            size='lg'
            onClick={handleEditProfile}
         />

         {/* Body -> Información extra: calificaciones, proyectos, etc*/}
         <Body />



      </VStack>
   );
};

export default DeveloperProfile;
