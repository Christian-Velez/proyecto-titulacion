import { CloseIcon } from '@chakra-ui/icons';
import {
   Divider,
   Flex,
   Icon,
   IconButton,
   Text,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

import LinkItem from './LinkItem';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { generalLogout, setIsChecking } from 'actions/auth';
import NavigateProfile from './NavigateProfile';

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


   
   return (
      <VStack
         className='animate__animated animate__fadeInRight animate__faster'
         w='100vw'
         bgColor='brand.500'
         zIndex={9999999}
         h='100vh'
         pos='fixed'
         p={1}
         top='0'
         right='0'
         overflowY='auto'
         display={displayMenu}
         alignItems='flex-start'
         color='white'
         
      >
         <Flex
            width='full'
            justifyContent='flex-end'
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
         </Flex>

         <Divider />

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

         <VStack
            w='full'
            style={{
               margin: 0,
               marginTop: 'auto',
               marginBottom: '30px',
            }}
         >
            <NavigateProfile userInfo={userInfo} isMobile={true} setDisplayMenu={setDisplayMenu}/>

         
            <Flex
               color={'brand.100'}
               width='full'
               as='button'
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
            </Flex>
         </VStack>
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
