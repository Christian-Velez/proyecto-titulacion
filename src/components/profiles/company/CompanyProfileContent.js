import { VStack } from '@chakra-ui/react';
import EditProfileButton from 'components/layout/EditProfileButton';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompanyProfileContent = ({
   companyInfo,
}) => {
   const navigate = useNavigate();

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   const handleEditProfile = () => {
      navigate('./edit');
   };

   const { id } = useSelector(
      (state) => state.auth
   );
   const isMyProfile = id === companyInfo.id;

   return (
      <VStack
         padding={{ base: 10, lg: 30, xl: 40 }}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
      >
         
         {
            isMyProfile && <EditProfileButton handleEditProfile={handleEditProfile} />
         }
         

      </VStack>
   );
};

export default CompanyProfileContent;
