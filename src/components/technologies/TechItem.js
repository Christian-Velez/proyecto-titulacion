import React from 'react';
import PropTypes from 'prop-types';
import IconImg from 'components/IconImg';


import {
   Heading,
   HStack,
   Text,
   VStack,
} from '@chakra-ui/react';

const TechItem = ({ technology }) => {
   const {
      img,
      name,
      type,
      categories,
      timesRequested,
   } = technology;

   return (
      <HStack
         w='full'
         spacing={5}
         border='1px solid'
         borderColor='gray.100'
         padding={5}
      >
         <IconImg
            src={img}
            alt={name}
            boxSize={{
               base: '70px',
               xl: '100px',
            }}
         />

         <VStack
            alignItems='flex-start'
            maxW='80%'
         >
            <Heading fontSize='lg'>{name}</Heading>
            <Text>Tipo: {type}</Text>
            <Text>
               Categorias: {categories.join(', ')}
            </Text>
            <Text>
               Solicitada: {timesRequested} veces
            </Text>
         </VStack>
      </HStack>
   );
};

TechItem.propTypes = {
   technology: PropTypes.object,
};

export default TechItem;
