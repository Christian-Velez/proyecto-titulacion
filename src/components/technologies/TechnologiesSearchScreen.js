// Hooks
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Info
import { startLoadingTechnologies } from 'actions/admin/technologies';


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
   const dispatch = useDispatch();
   

   // Recupera las tecnologias si es que el usuario no las ha cargado
   const { technologies: allTechsAvailable } = useSelector(state => state.tech);   
   useEffect(() => {
      if(allTechsAvailable.length === 0){
         dispatch(startLoadingTechnologies());
      }
   });



   return (
      <VStack
         padding={{ base: 7, lg: 20}}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
      >
         <VStack alignItems='flex-start' spacing={20} w='full'>

            <Heading> Tecnologías </Heading>
      
            {/* Top */}
            <TopTechnologies allTechsAvailable={allTechsAvailable} />



            {/*Buscador */}
            <VStack w='full' alignItems='flex-start' spacing={10}>
               <Divider />
               <Text> Consulta las tecnologías disponibles en el sitio.</Text>
               <Search allTechsAvailable={allTechsAvailable}/>

            </VStack>

         </VStack>
      </VStack>
   );
};


//TechnologiesSearchScreen.propTypes = {
//   history: PropTypes.any
//};


export default TechnologiesSearchScreen;
