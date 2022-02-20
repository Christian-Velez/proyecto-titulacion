import React from 'react';
import PropTypes from 'prop-types';
import TagDisplay from 'components/forms/TagDisplay';

const CertificationDisplay = ({ certification, setCertifications }) => {
   const { title, institution, year, _id } = certification;


   const handleDelete = () => {
      setCertifications(prevCer => prevCer.filter(cer => cer._id !== _id));
   };

   const certLabel = `${ title }. ${institution} (${year}).`;
   return (
      <TagDisplay label={certLabel} handleDelete={handleDelete} />
   );
};

CertificationDisplay.propTypes = {
   certification: PropTypes.object,
   setCertifications: PropTypes.func
};

export default CertificationDisplay;
