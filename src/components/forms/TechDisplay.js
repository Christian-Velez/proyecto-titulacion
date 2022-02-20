import React from 'react';
import PropTypes from 'prop-types';
import TagDisplay from 'components/forms/TagDisplay';

const TechDisplay = ({ technology, yearsOfExperience, id, setTechnologies }) => {
   const { name } = technology;
   
   const handleDelete = () => {
      setTechnologies(prevTech => prevTech.filter(tech => tech._id !== id));
   };

   const techLabel = `${ name }, ${yearsOfExperience} ${ yearsOfExperience === 1 ? 'año' : 'años'}`;
   return (
      <TagDisplay label={techLabel} handleDelete={handleDelete} />
   );
};


TechDisplay.propTypes = {
   technology: PropTypes.object,
   yearsOfExperience: PropTypes.number,
   id: PropTypes.string,
   setTechnologies: PropTypes.func
};

export default TechDisplay;
