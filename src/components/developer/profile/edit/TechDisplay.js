


import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/react';






const TechDisplay = ({ technology, yearsOfExperience, id}) => {
   const { name } = technology;
   return (
      <div>
         <Text> {name} </Text>
      </div>
   );
};


TechDisplay.propTypes = {
   technology: PropTypes.object,
   yearsOfExperience: PropTypes.number,
   id: PropTypes.string
};

export default TechDisplay;
