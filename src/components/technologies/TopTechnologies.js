import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
   Heading,
   HStack,
   Text,
   VStack,
} from '@chakra-ui/react';
import { sortByPopularity } from 'helpers/searchTechs';
import PodiumTechItem from './PodiumTechItem';

const TopTechnologies = ({ allTechsAvailable }) => {

   const [orderedTechs, setOrderedTechs] = useState([]);

   useEffect(() => {
      if(allTechsAvailable.length > 0) {         
         setOrderedTechs(sortByPopularity(allTechsAvailable));
      }
   }, [allTechsAvailable]);


   return (
      <VStack
         w='full'
         alignItems='center'
         spacing={20}
      >
         <Heading fontSize='lg'>
            Más populares
         </Heading>

         {
            orderedTechs.length > 0
            &&
            <HStack w='full' justifyContent='center' spacing={{ base: 5, lg: 20 }} h={{base:'200', xl:'400px'}}>
               <PodiumTechItem technology={orderedTechs[1]} place={2} alignSelf='center'/>
               <PodiumTechItem technology={orderedTechs[0]} place={1} alignSelf='flex-start'/>
               <PodiumTechItem technology={orderedTechs[2]} place={3} alignSelf='flex-end'/>
         
            </HStack>

         }
         
      </VStack>
   );
};

TopTechnologies.propTypes = {
   allTechsAvailable: PropTypes.array,
};

export default TopTechnologies;
