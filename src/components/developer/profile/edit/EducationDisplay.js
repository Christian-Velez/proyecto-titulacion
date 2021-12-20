

import React from 'react';
import PropTypes from 'prop-types';
import { HStack, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

const EducationDisplay = ({ education, setEducation }) => {
   const { title, institution ,year, _id } = education;


   const handleDelete = () => {
      setEducation(prevEd => prevEd.filter(ed => ed._id !== _id));
   };

   return (
      <HStack spacing={4} my={3}>
         <Tag >
            <TagLabel> { title }. { institution } ({year}) </TagLabel>
            <TagCloseButton onClick={ handleDelete }/>
         </Tag>
      </HStack>
   );
};

EducationDisplay.propTypes = {
   education: PropTypes.object,
   setEducation: PropTypes.func
};

export default EducationDisplay;
