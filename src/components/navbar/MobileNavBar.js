import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
   Flex,
   HStack,
   IconButton,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import IconImg from 'components/IconImg';

const MobileNavBar = ({ setDisplayMenu }) => {



   return (
      <HStack
         w='full'
         display={{ base: 'flex', lg: 'none' }}
         justify='space-between'
         padding={1}
         paddingLeft={5}
      >
         <Flex >
            <IconImg
               alt='Logo'
               src='/static/logo.png'
               boxSize={{ base: '30px' }}
            />
         </Flex>
           

         <IconButton
            aria-label='Open Menu'
            icon={<HamburgerIcon />}
            size='lg'
            onClick={() => {
               setDisplayMenu('flex');

               // Quita el scrollbar
               document.body.style.overflow = 'hidden';
            }}
         />
      </HStack>
   );
};

MobileNavBar.propTypes = {
   setDisplayMenu: PropTypes.func,
};

export default MobileNavBar;
