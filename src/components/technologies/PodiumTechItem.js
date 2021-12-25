import React from 'react';
import PropTypes from 'prop-types';
import {
   Flex,
   Heading,
   Text,
   VStack,
} from '@chakra-ui/react';
import IconImg from 'components/IconImg';

const PodiumTechItem = ({
   alignSelf,
   technology,
   place,
}) => {
   return (
      <VStack
         borderRadius={10}
         boxShadow='xl'
         w={{ base: '150px', xl:'300px'}}
         h={{ base: '150px', xl:'300px'}}
         padding={{ base: 1, xl: 5}}
         alignSelf={alignSelf}
         _hover={{
            cursor: 'pointer',
         }}
      >
         <Flex alignSelf='flex-start'>
            <Text fontWeight='bold'>
               {place}.
            </Text>
         </Flex>

         <VStack spacing={{ base: 0, xl: 4}} textAlign='center'>
            <IconImg
               src={technology.img}
               alt={technology.name}
               boxSize={{ base: '70px', xl: '130px' }}
            />
            <Heading fontSize={{ base: 'sm', xl: 'lg'}}>
               {technology.name}
            </Heading>
            <Text fontSize={{ base: 'xs', xl: 'sm'}}>
               {technology.timesRequested} veces
               solicitada
            </Text>
         </VStack>
      </VStack>
   );
};

PodiumTechItem.propTypes = {
   technology: PropTypes.object,
   place: PropTypes.number,
   alignSelf: PropTypes.string,
};

export default PodiumTechItem;
