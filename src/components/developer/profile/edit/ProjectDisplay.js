


import React from 'react';
import PropTypes from 'prop-types';
import { HStack, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';






const ProjectDisplay = ({ project, setProjects }) => {
   const { title, _id } = project;

   const handleDelete = () => {
      setProjects(prevProj => prevProj.filter(proj => proj._id !== _id));
   };

   return (
      <HStack spacing={4} my={3}>
         <Tag >
            <TagLabel> { title } </TagLabel>
            <TagCloseButton onClick={ handleDelete }/>
         </Tag>
      </HStack>
   );
};


ProjectDisplay.propTypes = {
   project: PropTypes.object,
   setProjects: PropTypes.func
};

export default ProjectDisplay;
