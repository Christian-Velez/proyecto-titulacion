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
         pl={3}
         display={{ base: 'none', lg: 'flex' }}
         alignItems='flex-start'
         paddingY={6}
         boxShadow='dark-lg'
      >
         {/*Logotipo de la pagina */}
         <HStack width='full' paddingLeft={5}>
            <Text fontSize='2xl'>NombreApp</Text>
         </HStack>

         <Divider />

         {/*Links que dependen del tipo de cuenta*/}
         {userLinks.map((link) => {
            const { index, path, name, icon} = link;

            return (
               <LinkItem key={index} icon={icon} path={path}>
                  {name}
               </LinkItem>
            );
         })}
      </VStack>
   );
};

export default ComputerNavbar;
