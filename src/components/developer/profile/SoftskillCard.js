import React from 'react';
import PropTypes from 'prop-types';
import { Heading, HStack, VStack } from '@chakra-ui/react';
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
            maxWidth='50%'
         >
            <Heading fontSize={{ base: 'md', '2xl': 'lg'}} fontWeight='semibold'>{ name }</Heading>
               
         </VStack>

      </HStack>
   );
};

SoftskillCard.propTypes = {
   soft: PropTypes.object
};


export default SoftskillCard;
