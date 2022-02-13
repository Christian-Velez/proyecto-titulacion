import React from 'react';
import LinkItem from './LinkItem';
import {
   Heading,
   HStack,
   Icon,
   Text,
   VStack,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
   generalLogout,
   setIsChecking,
} from 'actions/auth';
import PropTypes from 'prop-types';
import IconImg from 'components/layout/IconImg';
import NavigateProfile from './NavigateProfile';

const ComputerNavbar = ({ userLinks, userInfo}) => {
   const dispatch = useDispatch();
   const handleLogout = () => {
      dispatch(generalLogout());
      dispatch(setIsChecking(false));
   };

   const { role } = useSelector(state => state.auth);

   return (
      <VStack
         h='100vh'
         w='250px'
         pl={3}
         display={{ base: 'none', lg: 'flex' }}
         alignItems='flex-start'
         paddingY={50}
         overflowY='auto'
      >
         {/*Logotipo de la pagina */}
         <HStack
            width='full'
            paddingLeft={5}
            marginBottom={10}
         >
            <IconImg
               alt='Logo'
               src='/static/logo.png'
               boxSize={{ base: '30px' }}
            />
            <Heading fontSize='2xl' color='white'>
               devconnect
            </Heading>
         </HStack>
        


         {
            role !== 'Admin' &&
            <NavigateProfile 
               userInfo={userInfo}
            />
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
               >
                  {name}
               </LinkItem>
            );
         })}

        
            
            <HStack
               color={'brand.100'}
               w='full'
               as='button'
               onClick={handleLogout}
               _hover={{
                  bgColor: 'brand.600',
               }}
               transition='background-color .3s ease'
               paddingY={3}
               paddingX={5}
               width='full'
               style={{
                  margin: 0,
                  marginTop: 'auto',
               }}
               borderLeftRadius='md'
            >
               <Icon as={FiLogOut} h={5} w={5} />
               <Text fontSize='lg'>
                  Cerrar sesión
               </Text>
            </HStack>
      </VStack>
   );
};

ComputerNavbar.propTypes = {
   userLinks: PropTypes.array,
   userInfo: PropTypes.object,
};

export default ComputerNavbar;
