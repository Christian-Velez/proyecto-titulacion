


import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/react';






const ProjectDisplay = ({ project }) => {
   const { title } = project;
   return (
      <div>
         <Text> { title } </Text>
      </div>
   );
};


ProjectDisplay.propTypes = {
   project: PropTypes.object
};

export default ProjectDisplay;
