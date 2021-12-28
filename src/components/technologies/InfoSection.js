import React from 'react';
import PropTypes from 'prop-types';
import {
   HStack,
   Icon,
   VStack,
} from '@chakra-ui/react';

const InfoSection = ({ children, icon }) => {
   return (
      <HStack
         w={{ base: 'full', xl: '48%' }}
         alignItems='flex-start'
         p={10}
         borderRadius='lg'
         border='1px solid'
         borderColor='gray.200'
         spacing={10}
         marginBottom={10}
      >
         <Icon
            as={icon}
            h={10}
            w={10}
         />
         <VStack alignItems='flex-start'>
            { children }
         </VStack>
      </HStack>
   );
};

InfoSection.propTypes = {
   children: PropTypes.array,
   icon: PropTypes.func
};

export default InfoSection;
