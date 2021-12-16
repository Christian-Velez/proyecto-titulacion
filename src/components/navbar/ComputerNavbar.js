import React from 'react';
import LinkItem from './LinkItem';
import {
   Divider,
   HStack,
   Icon,
   Text,
   VStack,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { logout, setIsChecking } from 'actions/auth';
import PropTypes from 'prop-types';


const ComputerNavbar = ({ userLinks }) => {
   
   const dispatch = useDispatch();
   const handleLogout = () => {
      dispatch(logout());
      dispatch(setIsChecking(false));
   };

   return (
      <VStack
         h='100vh'
         w='250px'
         pl={3}
         display={{ base: 'none', lg: 'flex' }}
         alignItems='flex-start'
         paddingY={6}
         boxShadow='dark-lg'
         overflowY='auto'
      >
         {/*Logotipo de la pagina */}
         <HStack width='full' paddingLeft={5}>
            <Text fontSize='2xl'>NombreApp</Text>
         </HStack>

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
               >
                  {name}
               </LinkItem>
            );
         })}

         <HStack
            color={'brand.100'}
            width='full'
            as='button'
            paddingY={3}
            paddingX={5}
            style={{
               margin: 0,
               marginTop: 'auto',
               marginBottom: '50px'
            }}
            onClick={handleLogout}
            _hover={{
               bgColor: 'brand.600',
            }}
            transition='background-color .3s ease'
         >
            <Icon as={ FiLogOut } h={5} w={5}/>
            <Text fontSize='lg'> Cerrar sesión </Text>
         </HStack>
      </VStack>
   );
};




ComputerNavbar.propTypes = {
   userLinks: PropTypes.array
};


export default ComputerNavbar;
