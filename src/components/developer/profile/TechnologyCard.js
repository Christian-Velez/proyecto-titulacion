
import React from 'react';


import PropTypes from 'prop-types';
import { HStack, Text, VStack } from '@chakra-ui/react';
import IconImg from 'components/IconImg';






const TechnologyCard = ({ technology, yearsOfExperience }) => {

   const { name, img, type } = technology;
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
            <Text fontSize='sm' color='gray.500'> { type } </Text>
            <Text> { yearsOfExperience } años de experiencia</Text>
         </VStack>

      </HStack>
   );
};

TechnologyCard.propTypes = {
   technology: PropTypes.object,
   yearsOfExperience: PropTypes.number
};


export default TechnologyCard;
