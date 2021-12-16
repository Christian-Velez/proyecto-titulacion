import React from 'react';
import PropTypes from 'prop-types';

import {
   HStack,
   Text,
   VStack,
   Image,
   Flex
} from '@chakra-ui/react';

const Technology = ({ info }) => {
   const { 
      name, 
      type,
      img,
   } = info;

   const relatedTechss = [ 'Yo', 'tu', 'xd'];
   const stringRelated = relatedTechss.join(', ');


   console.log(info);
   return (
      <HStack
         w='full'
         spacing={5}
         border='1px'
         alignItems='flex-start'
         padding={{ base: 2, lg: 5 }}
         borderRadius='md'
         borderColor='gray.200'
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
            <Text fontSize={{ base: 'smaller', lg: 'md'}}> Relacionadas: { stringRelated } </Text>
            <Text fontSize={{ base: 'smaller', lg: 'md'}}> Relacionadas: { stringRelated } </Text>
         </VStack>
      </HStack>
   );
};

Technology.propTypes = {
   info: PropTypes.object,
};

export default Technology;
