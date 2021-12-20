

import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/react';

const EducationDisplay = ({ education }) => {
   const { title, institution ,year } = education;
   return (
      <Text>
         { title }. { institution } ({year}).
      </Text>
   );
};

EducationDisplay.propTypes = {
   education: PropTypes.object
};

export default EducationDisplay;
