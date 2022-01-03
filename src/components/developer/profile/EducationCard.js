

import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@chakra-ui/react';

const EducationCard = ({ education }) => {

   const { title, institution, year } = education;
   
   return (
      <ListItem> {title}. {institution} ({year}) </ListItem>
   );
};

EducationCard.propTypes = {
   education: PropTypes.object
};


export default EducationCard;
