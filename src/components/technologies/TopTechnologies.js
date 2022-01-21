import React from 'react';
import {
   Heading,
   HStack,
   VStack,
} from '@chakra-ui/react';
import { sortByPopularity } from 'helpers/searchTechs';
import PodiumTechItem from './PodiumTechItem';
import { useSelector } from 'react-redux';

const TopTechnologies = () => {
   // Recupera las tecnologias 
   const { technologies: allTechsAvailable } = useSelector(state => state.tech);
   const orderedTechs = sortByPopularity([...allTechsAvailable]);

   return (
      <VStack
         w='full'
         alignItems='center'
         spacing={20}
      >
         <Heading fontSize='lg'>
            Más populares
         </Heading>
            
         <HStack w='full' justifyContent='center' spacing={{ base: 5, lg: 20 }} h={{base:'200', xl:'400px'}}>
            <PodiumTechItem technology={orderedTechs[1]} place={2} alignSelf='center'/>
            <PodiumTechItem technology={orderedTechs[0]} place={1} alignSelf='flex-start'/>
            <PodiumTechItem technology={orderedTechs[2]} place={3} alignSelf='flex-end'/>
         </HStack>
      </VStack>
   );
};


export default TopTechnologies;
