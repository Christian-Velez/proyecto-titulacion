

import React from 'react';
import PropTypes from 'prop-types';
import { HStack, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

const TagDisplay = ({ label, handleDelete }) => {
   return (
      <HStack spacing={4} my={3}>
         <Tag >
            <TagLabel> { label } </TagLabel>
            <TagCloseButton onClick={ handleDelete }/>
         </Tag>
      </HStack>
   );
};

TagDisplay.propTypes = {
   label: PropTypes.string,
   handleDelete: PropTypes.func
};

export default TagDisplay;