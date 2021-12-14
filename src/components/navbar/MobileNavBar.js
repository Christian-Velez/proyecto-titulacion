import { HamburgerIcon } from '@chakra-ui/icons';
import { HStack, IconButton } from '@chakra-ui/react';
import React from 'react'

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
   )
}

export default MobileNavBar
