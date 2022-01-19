

import React from 'react';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import EmptySection from './EmptySection';

const EducationCards = () => {
   const { education: educationArr } = useSelector(state => state.devInfo);
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

export default EducationCards;
