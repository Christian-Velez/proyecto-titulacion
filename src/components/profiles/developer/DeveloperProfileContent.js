import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { VStack } from '@chakra-ui/react';



import EditProfileButton from 'components/EditProfileButton';
import MainInfo from '../MainInfo';
import Body from './Body';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DeveloperProfileContent = ({ devInfo }) => {

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);
   const navigate = useNavigate();
   const handleEditProfile = () => {
      navigate('./edit');
   };


   const { id } = useSelector(state=> state.auth);
   const isMyProfile = id === devInfo.id;


   return (
      <VStack
         padding={{ base: 10, lg: 30, xl: 40 }}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
      >
         {/* Header -> Información principal del desarrollador */}
         <MainInfo userInfo={devInfo} />


         {
            isMyProfile && <EditProfileButton handleEditProfile={handleEditProfile} />
         }
         

         {/* Body -> Información extra: calificaciones, proyectos, etc*/}
         <Body devInfo={devInfo}/>
      </VStack>
   );
};

DeveloperProfileContent.propTypes = {
   devInfo: PropTypes.object,
};

export default DeveloperProfileContent;
