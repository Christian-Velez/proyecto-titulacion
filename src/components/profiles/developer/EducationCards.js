import React from 'react';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import EmptySection from './EmptySection';
import PropTypes from 'prop-types';

const EducationCards = ({ devInfo}) => {
   const { education: educationArr } = devInfo;
   
   return (
      educationArr.length === 0
      ? <EmptySection />
      : (
         <UnorderedList
            paddingLeft={10}
            spacing={3}
         >
            {
               educationArr.map(ed => {
                  const { _id, title, institution, year } = ed;  
                  return <ListItem key={_id}>{title}. {institution} ({year}). </ListItem>;
               })
            }
         </UnorderedList>
      )
   );
};


EducationCards.propTypes = {
   devInfo: PropTypes.object
};

export default EducationCards;
