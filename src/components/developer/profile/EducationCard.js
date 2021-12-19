

import React from 'react';
import PropTypes from 'prop-types';
import { Text, VStack } from '@chakra-ui/react';

const EducationCard = ({ education }) => {

   const { title, institution, year } = education;
   
   return (
      <VStack 
         paddingX={5}
         paddingY={2}
         alignItems='flex-start'
         justifyContent='flex-start'
         w='full'
      >
         <Text>{title}. {institution} ({year}).</Text>
      </VStack>
   );
};

EducationCard.propTypes = {
   education: PropTypes.object
};


export default EducationCard;
