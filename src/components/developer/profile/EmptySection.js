import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const EmptySection = () => {
   return (
      <Flex width='full' h='80px' alignItems='center' p={5}>
         <Text color='gray.600'> Sin registros. </Text>
      </Flex>
   );
};

export default EmptySection;
