


import React from 'react';
import PropTypes from 'prop-types';
import { HStack, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';






const TechDisplay = ({ technology, yearsOfExperience, id, setTechnologies }) => {
   const { name } = technology;
   
   
   const handleDelete = () => {
      setTechnologies(prevTech => prevTech.filter(tech => tech._id !== id));
   };

   return (
      <HStack spacing={4} my={3}>
         <Tag >
            <TagLabel> { name }, {yearsOfExperience} años</TagLabel>
            <TagCloseButton onClick={ handleDelete }/>
         </Tag>
      </HStack>
   );
};


TechDisplay.propTypes = {
   technology: PropTypes.object,
   yearsOfExperience: PropTypes.number,
   id: PropTypes.string,
   setTechnologies: PropTypes.func
};

export default TechDisplay;
