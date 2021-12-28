import React from 'react';
import PropTypes from 'prop-types';
import IconImg from 'components/IconImg';


import {
   Heading,
   HStack,
   Text,
   VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const TechItem = ({ technology }) => {
   const {
      img,
      name,
      type,
      categories,
      timesRequested,
   } = technology;


      


   return (
      <Link to={`/dev/technologies/${name}`} style={{ width: '100%'}}>
      <HStack
         w='full'
         spacing={5}
         border='1px solid'
         borderColor='gray.100'
         padding={5}
         borderRadius='lg'
         _hover={{
            cursor: 'pointer',
            boxShadow: 'md',

         }}     
         transition='box-shadow .5s ease'
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
            maxW='70%'
            fontSize={{ base: 'sm', lg: 'md'}}
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
      </Link>
   );
};

TechItem.propTypes = {
   technology: PropTypes.object,
};

export default TechItem;
