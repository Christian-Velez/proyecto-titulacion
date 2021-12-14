import { CloseIcon } from '@chakra-ui/icons';
import {
   Divider,
   Flex,
   IconButton,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import LinkItem from './LinkItem';

const MobileHidden = ({
   userLinks,
   displayMenu,
   setDisplayMenu,
}) => {
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
               }}
            />
         </Flex>

         <Divider />

         {/*Links que dependen del tipo de cuenta*/}
         {userLinks.map((link) => {
            const { index, path, name, icon } = link;

            return (
               <LinkItem key={index} icon={icon} path={path}>
                  {name}
               </LinkItem>
            );
         })}
      </VStack>
   );
};

export default MobileHidden;
