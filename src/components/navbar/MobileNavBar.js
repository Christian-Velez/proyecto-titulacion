import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { HStack, IconButton } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const MobileNavBar = ({ setDisplayMenu }) => {
   return (
      <HStack
      w='100%'
      display={{ base: 'flex', lg: 'none' }}
      justify='flex-end'
      p={1}
   >
      <IconButton
         aria-label='Open Menu'
         icon={<HamburgerIcon />}
         size='lg'
         onClick={() => {
            setDisplayMenu('flex');
         }}
      />
   </HStack>
   );
};

MobileNavBar.propTypes = {
   setDisplayMenu: PropTypes.func
};



export default MobileNavBar;
