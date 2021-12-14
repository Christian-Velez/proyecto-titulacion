import {
   Divider,
   HStack,
   Text,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import LinkItem from './LinkItem';

const ComputerNavbar = ({ userLinks }) => {
   return (
      <VStack
         h='100vh'
         w='250px'
         display={{ base: 'none', lg: 'flex' }}
         boxShadow='dark-lg'
         alignItems='flex-start'
         paddingY={6}
      >
         {/*Logotipo de la pagina */}
         <HStack width='full' paddingLeft={5}>
            <Text fontSize='2xl'>NombreApp</Text>
         </HStack>

         <Divider />

         {/*Links que dependen del tipo de cuenta*/}
         {userLinks.map((link) => {
            const { index, path, name } = link;

            return (
               <LinkItem key={index} path={path}>
                  {name}
               </LinkItem>
            );
         })}
      </VStack>
   );
};

export default ComputerNavbar;
