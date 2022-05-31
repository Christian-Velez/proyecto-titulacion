import React from 'react';
import PropTypes from 'prop-types';
import {
   Flex,
   Link as ChakraLink,
   Text,
   VStack,
} from '@chakra-ui/react';
import IconImg from 'components/layout/IconImg';
import { Link } from 'react-router-dom';

const DevCompanies = ({ companies }) => {
   return (
      <Flex
         padding={10}
         flexWrap='wrap'
         gap={20}
         textAlign='center'
         justifyContent={{ base: 'center', '2xl': 'flex-start' }}
      >
         {companies.map((company) => {
            const { id, img, name } = company;

            return (
               <VStack key={id}>
                  <IconImg
                     alt={name}
                     src={img}
                     boxSize={{ base: '100px' }}
                  />

                  <ChakraLink
                     as={Link}
                     to={`/dev/search/${id}`}
                  >
                     <Text fontWeight='bold' >
                        {name}
                     </Text>
                  </ChakraLink>
               </VStack>
            );
         })}
      </Flex>
   );
};

DevCompanies.propTypes = {
   companies: PropTypes.array,
};

export default DevCompanies;
