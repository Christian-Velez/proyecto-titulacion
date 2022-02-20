

import React from 'react';
import PropTypes from 'prop-types';
import TagDisplay from 'components/forms/TagDisplay';

const EducationDisplay = ({ education, setEducation }) => {
   const { title, institution ,year, _id } = education;


   const handleDelete = () => {
      setEducation(prevEd => prevEd.filter(ed => ed._id !== _id));
   };

   const educationLabel = `${ title }. ${ institution } (${year}).`;
   return (
      <TagDisplay label={educationLabel} handleDelete={handleDelete}/> 
   );
};

EducationDisplay.propTypes = {
   education: PropTypes.object,
   setEducation: PropTypes.func
};

export default EducationDisplay;
