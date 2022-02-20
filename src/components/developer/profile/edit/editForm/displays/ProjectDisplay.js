import React from 'react';
import PropTypes from 'prop-types';
import TagDisplay from 'components/forms/TagDisplay';

const ProjectDisplay = ({ project, setProjects }) => {
   const { title, _id } = project;

   const handleDelete = () => {
      setProjects(prevProj => prevProj.filter(proj => proj._id !== _id));
   };

   return (
      <TagDisplay label={title} handleDelete={handleDelete} />
   );
};


ProjectDisplay.propTypes = {
   project: PropTypes.object,
   setProjects: PropTypes.func
};

export default ProjectDisplay;
