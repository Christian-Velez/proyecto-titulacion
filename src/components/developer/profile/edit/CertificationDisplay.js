import React from 'react';
import PropTypes from 'prop-types';
import { HStack, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

const CertificationDisplay = ({ certification, setCertifications }) => {
   const { title, institution, year, _id } = certification;


   const handleDelete = () => {
      setCertifications(prevCer => prevCer.filter(cer => cer._id !== _id));
   };

   return (
      <HStack spacing={4} my={3}>
         <Tag >
            <TagLabel> { title }. {institution} ({year}). </TagLabel>
            <TagCloseButton onClick={ handleDelete }/>
         </Tag>
      </HStack>
   );
};

CertificationDisplay.propTypes = {
   certification: PropTypes.object,
   setCertifications: PropTypes.func
};

export default CertificationDisplay;
