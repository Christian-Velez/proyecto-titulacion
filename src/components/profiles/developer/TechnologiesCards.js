
import React from 'react';


import { HStack, Text, VStack, Heading } from '@chakra-ui/react';
import IconImg from 'components/IconImg';
import EmptySection from './EmptySection';
import PropTypes from 'prop-types';

const TechnologiesCards = ({ devInfo }) => {
   const { technologies } = devInfo;


   return (
      technologies.length === 0
      ? <EmptySection />
      : technologies.map(techSchema => {
         const { technology, yearsOfExperience, _id } = techSchema;
         const { img, name, type } = technology;
         const text = yearsOfExperience === 1 ? 'año' : 'años';

         return (
            <HStack
               key={_id}
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
                  <Heading fontSize={{ base: 'md', '2xl': 'lg' }}> { name } </Heading>
                  <Text fontSize={{ base: 'xs', lg: 'sm'}} color='gray.500'> { type } </Text>
                  <Text fontSize={{ base: 'sm', lg: 'md'}}> 
                  {
                     yearsOfExperience === 0
                     ? 'Sin experiencia.'
                     : `${ yearsOfExperience } ${ text } de experiencia.`
                  } </Text>
               </VStack>
            </HStack>
         );
      })
   );
};






TechnologiesCards.propTypes = {
   devInfo: PropTypes.object
};



export default TechnologiesCards;
