import React from 'react';
import PropTypes from 'prop-types';
import { HStack, Text, VStack } from '@chakra-ui/react';
import IconImg from 'components/IconImg';



const SoftskillCard = ({ soft }) => {
   const { img, name } = soft;

   return (
      <HStack 
         p={5} 
         alignItems='center'
         w='full'
         spacing={8}
      >
            <IconImg
               src={ img }
               boxSize={{ 
                  base: '80px',
                  lg: '100px'
               }}
               alt={ name }
            />

         <VStack
            alignItems='flex-start'
         >
            <Text fontWeight='black'> { name } </Text>
               
         </VStack>

      </HStack>
   );
};

SoftskillCard.propTypes = {
   soft: PropTypes.object
};


export default SoftskillCard;
