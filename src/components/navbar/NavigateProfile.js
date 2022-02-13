import React from 'react';
import PropTypes from 'prop-types';
import {
   HStack,
   Text,
   VStack,
} from '@chakra-ui/react';
import IconImg from 'components/layout/IconImg';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';
import { useSelector } from 'react-redux';

const NavigateProfile = ({
   userInfo,
   isMobile = false,
   setDisplayMenu
}) => {
   const location = useLocation();
   const { redirect } = useSelector(state => state.auth);
 

   const navigate = useNavigate();
   const { img, name, kind } = userInfo;


   const isActive = location.pathname === `${redirect}/profile`;
   const isActiveColor = 'white';



   const handleNavigate = () => {
      navigate(`${redirect}/profile`);
   
      if(isMobile) {
         setDisplayMenu('none');

         // Regresa el scrollbar
         document.body.style.overflow = 'auto';
      }

   };

   return (
         (img && name && kind)
         ?   
         <HStack
            paddingY={5}
            paddingX={{ base: 10, lg: 5 }}
            marginBottom={5}
            color={ isActive ? isActiveColor : 'brand.100' }
            alignItems='flex-start'
            justifyContent='flex-start'
            w='full'
            _hover={{
               bgColor: 'brand.600',
            }}
            transition='background-color .3s ease'
            as='button'
            onClick={ handleNavigate }
            borderLeftRadius='md'

         >
            <IconImg
               src={img}
               alt={name}
               boxSize={{ base: 10 }}
            />

            <VStack
               alignItems='flex-start'
               spacing={0}
               maxW='70%'
               maxH='60px'
               overflow='hidden'
               whiteSpace='nowrap'
            >
               <Text
                  fontSize='md'
                  marginLeft={0}
               >
                  {name}
               </Text>
               <Text fontSize='xs'>
                  {kind === 'Developer'
                     ? 'PROGRAMADOR'
                     : kind === 'Company'
                     ? 'EMPRESA'
                     : ''}
               </Text>
            </VStack>
         </HStack>
         : <LoadingScreen />
   );
};

NavigateProfile.propTypes = {
   redirect: PropTypes.string,
   isProfileActive: PropTypes.bool,
   userInfo: PropTypes.object,
   isMobile: PropTypes.bool,
   setDisplayMenu: PropTypes.func
};

export default NavigateProfile;
