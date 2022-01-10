// Hooks
import React from 'react';
import { useSelector } from 'react-redux';


// Componentes
import {
   Heading,
   Text,
   VStack,
   Divider,
} from '@chakra-ui/react';
import Search from './Search';
import TopTechnologies from './TopTechnologies';




const TechnologiesSearchScreen = () => {
   // Recupera las tecnologias 
   const { technologies: allTechsAvailable } = useSelector(state => state.tech);

   return (
      <VStack
         padding={{ base: 7, lg: 20}}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
      >
            
            <VStack alignItems='flex-start' spacing={20} w='full'>
               <Heading fontSize={{ base: '2xl', lg: '3xl'}}> Tecnologías </Heading>
         
               {/* Top */}
               <TopTechnologies allTechsAvailable={allTechsAvailable} />



               {/*Buscador  y resultados*/}
               <VStack w='full' alignItems='flex-start' spacing={10}>
                  <Divider id='results'/>
                  <Text> Consulta las tecnologías disponibles en el sitio.</Text>
                  <Search allTechsAvailable={allTechsAvailable}/>
               </VStack>
            </VStack>
         
      </VStack>
   );
};




export default TechnologiesSearchScreen;
