import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
   Flex,
   Heading,
   IconButton,
   VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import IconImg from 'components/IconImg';

const MobileNavBar = ({ setDisplayMenu }) => {
   return (
      <VStack
         w='100%'
         display={{ base: 'flex', lg: 'none' }}
         justify='flex-end'
         alignItems='center'
         padding={1}
         h='55px'
      >
         <Flex marginBottom={2}>
            <IconImg
               alt='Logo'
               src='/static/logo.png'
               boxSize={{ base: '30px' }}
            />
            <Heading color='white' fontSize='2xl'  marginLeft={1}>
               {' '}
               devconnect{' '}
            </Heading>
         </Flex>

         <IconButton
            aria-label='Open Menu'
            icon={<HamburgerIcon />}
            size='lg'
            position='absolute'
            alignSelf='flex-end'
            onClick={() => {
               setDisplayMenu('flex');

               // Quita el scrollbar
               document.body.style.overflow = 'hidden';
            }}
         />
      </VStack>
   );
};

MobileNavBar.propTypes = {
   setDisplayMenu: PropTypes.func,
};

export default MobileNavBar;
