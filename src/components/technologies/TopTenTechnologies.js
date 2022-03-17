import React from 'react';
import Layout from 'components/layout';
import TechItem from './TechItem';
import { Badge, Flex, VStack } from '@chakra-ui/react';
import { sortByPopularity } from 'helpers/searchTechs';
import { useSelector } from 'react-redux';
import useScrollToTop from 'hooks/useScrollToTop';

const TopTenTechnologies = () => {
   useScrollToTop();
   // Recupera las tecnologias 
   const { technologies: allTechsAvailable } = useSelector(state => state.tech);
   const orderedTechs = sortByPopularity([...allTechsAvailable]);
   
   const Top = () => {
      let items = [];
      for(let i = 0; i < 10; i++) {
         const tech = orderedTechs[i];
         items.push(
            <Flex width='full' key={tech.id}>
               <Badge pos='relative' colorScheme='purple' left={5} top={1} height='20px'>{i+1}</Badge>
               <TechItem technology={tech}/>
            </Flex>
         );
      }

      return items;
   };

   return (
      <Layout title='Tecnologías más populares del sitio'>
         <VStack w='full'>
            <Top />
         </VStack>
      </Layout>
   );
};

export default TopTenTechnologies;
