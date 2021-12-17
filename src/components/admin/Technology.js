import React from 'react';
import PropTypes from 'prop-types';

import {
   HStack,
   Text,
   VStack,
   Image,
   Flex
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Technology = ({ info }) => {
   const { 
      id,
      name, 
      type,
      relatedTechs,
      categories,
      img,
   } = info;


   const navigate = useNavigate();
   const relatedTechsHere = relatedTechs.map(tech => {
      const { name } = tech;
      return name;
   });

   const categoriesHere = categories.join(', ');
   const stringRelated = relatedTechsHere.join(', ');

   const handleEdit = () => {
      navigate(`/admin/technologies/edit/${id}`);
   };

   return (
      <HStack
         w='full'
         spacing={5}
         border='1px'
         alignItems='flex-start'
         padding={{ base: 2, lg: 5 }}
         borderRadius='md'
         borderColor='gray.200'
         _hover={{
            cursor: 'pointer',
            bgColor: 'gray.50',
         }}
         transition='background-color .3s ease'

         onClick={ handleEdit }
      >
         <Flex 
            width={{ base: '20%', lg: '8%'}}
            height='auto'
         >
            <Image
               src={ img }
               alt={ `${name} imagen`}
            />
         </Flex>

         <VStack alignItems='flex-start'
            width={{ base: '80%', lg: '92%'}}
            spacing={0}
         >
            <Text fontWeight='bold'> {name} </Text>
            <Text fontSize={{ base: 'smaller', lg: 'md'}}> Tipo: { type } </Text>
            <Text fontSize={{ base: 'smaller', lg: 'md'}}> Categorías:  { categoriesHere } </Text>
            <Text fontSize={{ base: 'smaller', lg: 'md'}}> Relacionadas: { stringRelated } </Text>
         </VStack>
      </HStack>
   );
};

Technology.propTypes = {
   info: PropTypes.object,
};

export default Technology;
