import { CloseIcon } from '@chakra-ui/icons';
import {
   Flex,
   HStack,
   Icon,
   IconButton,
   Text,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

import LinkItem from './LinkItem';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { generalLogout, setIsChecking } from 'actions/auth';
import NavigateProfile from './NavigateProfile';
import IconImg from 'components/IconImg';

const MobileHidden = ({
   userLinks,
   userInfo,
   displayMenu,
   setDisplayMenu,
}) => {
   const dispatch = useDispatch();
   const handleLogout = () => {
      dispatch(generalLogout());
      dispatch(setIsChecking(false));

      // Regresa el scrollbar
      document.body.style.overflow = 'auto';

   };

   const { role } = useSelector(state => state.auth);


   
   return (
      <VStack
         className='animate__animated animate__fadeIn animate__faster'
         minH='100vh'
         w='100vw'
         bgColor='brand.500'
         zIndex={9999999}
         pos='fixed'
         p={1}
         top='0'
         right='0'
         overflowY='auto'
         display={displayMenu}
         alignItems='flex-start'
         color='white' 
         
      >

         {/*Boton para cerrar y logo*/}
         <Flex
            width='full'
            justifyContent='space-between'
            paddingRight={4}
            alignItems='center'
         >
            
            <IconButton
               aria-label='Close Menu'
               size='lg'
               icon={<CloseIcon />}
               onClick={() => {
                  setDisplayMenu('none');

                  // Regresa el scrollbar
                  document.body.style.overflow = 'auto';
               }}
            />

            <Flex >
               <IconImg
                  alt='Logo'
                  src='/static/logo.png'
                  boxSize={{ base: '30px' }}
               />
            </Flex>
         </Flex>



         {
            role !== 'Admin' &&
            <NavigateProfile userInfo={userInfo} isMobile={true} setDisplayMenu={setDisplayMenu}/>
         }


         {/*Links que dependen del tipo de cuenta*/}
         {userLinks.map((link) => {
            const { index, path, name, icon } =
               link;

            return (
               <LinkItem
                  key={index}
                  icon={icon}
                  path={path}
                  setDisplayMenu={setDisplayMenu}
                  isMobile={true}
               >
                  {name}
               </LinkItem>
            );
         })}

         
         <HStack
            color={'brand.100'}
            width='full'
            as='button'
            borderLeftRadius='md'
            paddingY={3}
            paddingX={10}
            onClick={handleLogout}
            _hover={{
               bgColor: 'brand.600',
            }}
            transition='background-color .3s ease'
         >
            <Icon as={FiLogOut} h={5} w={5} />
            <Text fontSize='lg'>
               Cerrar sesión
            </Text>
         </HStack>
      </VStack>
   );
};

MobileHidden.propTypes = {
   userLinks: PropTypes.array,
   displayMenu: PropTypes.string,
   setDisplayMenu: PropTypes.func,
   userInfo: PropTypes.object
};

export default MobileHidden;
