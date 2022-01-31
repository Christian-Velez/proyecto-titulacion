

import {  VStack } from '@chakra-ui/react';
import EditProfileButton from 'components/EditProfileButton';
import MainInfo from 'components/profiles/MainInfo';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Body from './Body';

const CompanyProfile = () => {
   const companyInfo = useSelector(state => state.companyInfo);
   const navigate = useNavigate();

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

  
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
         {/*Header informacion principal*/}
         <MainInfo userInfo={companyInfo}/>


         {/*Boton para editar el perfil */}
         <EditProfileButton handleEditProfile={handleEditProfile}/>


         <Body />


      </VStack>
   );
};

export default CompanyProfile;
