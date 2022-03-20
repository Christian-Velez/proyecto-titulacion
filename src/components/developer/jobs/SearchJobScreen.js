// Hooks 
import React, {
   useEffect,
   useState,
} from 'react';
import {
   useDispatch,
   useSelector,
} from 'react-redux';


// Actions
import { startLoadingJobs } from 'actions/developer/jobs';

// Componentes
import {
   Flex,
   Heading,
   HStack,
   VStack,
   Tabs, 
   TabList, 
   TabPanels, 
   Tab, 
   TabPanel
} from '@chakra-ui/react'
;
import { Outlet } from 'react-router-dom';
import AllJobs from './AllJobs';
import RecommendedJobs from './RecommendedJobs';
import LoadingScreen from 'components/layout/LoadingScreen';


const SearchJobScreen = () => {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(true);

   // Todos los trabajos disponibles
   const { allJobs, isJobSelected } = useSelector(state => state.devJobs);

   useEffect(() => {
      Promise.all([
         dispatch(startLoadingJobs()),
      ]).then(() => {
         setIsLoading(false);
      });
   }, [dispatch]);


   return (
      <HStack 
         minH='100vh'
         w='full' 
         spacing={0}
         alignItems='flex-start' 
         style={{
            margin: 0
         }}
      >

         {/* Buscador, parte izq en dispositivos de escritorio */}
         <VStack
            alignItems='flex-start'
            className='animate__animated animate__fadeIn animate__faster'
            display={{ base: isJobSelected && 'none', '2xl': 'flex'}}
            maxH={{ '2xl': '100vh' }}
            overflowY={{ '2xl': 'scroll' }}    
            padding={{ base: 7, lg: 20 }}
            spacing={20}
            w={{ base: 'full', '2xl': '75%'}}
         >
            <Heading
               fontSize={{ base: '2xl', lg: '3xl' }}
            > 
               Empleos 
            </Heading>

            <Tabs width='full' colorScheme='brandPrimary'>
               <TabList>
                  <Tab>Recomendados</Tab>
                  <Tab>Todos</Tab>
               </TabList>
            
               <TabPanels>
                  <TabPanel>
                     {
                        isLoading 
                           ? <LoadingScreen />
                           : <RecommendedJobs allJobs={allJobs}/>
                     }
                  </TabPanel>
                  <TabPanel>
                     {
                        isLoading 
                           ? <LoadingScreen />
                           : <AllJobs allJobs={allJobs}/>
                     }
                  </TabPanel>
               </TabPanels>
            </Tabs>
         </VStack>


         <Flex 
            display={{ base: !isJobSelected && 'none', '2xl': 'flex' }}
            maxH={{ '2xl': '100vh'}}
            overflowY={{ '2xl': 'scroll'}}  
            w={{ base:'full', '2xl': '25%'}}
            minW='380px'
         >
            {
               /* Componente => JobScreen
               
               Movil -> Lo muestra en una pantalla completa, w = full
               PC -> Lo muestra a la derecha en una seccion, w = 25%
            
            */}
            <Outlet />
         </Flex>
      </HStack>

   );
};

export default SearchJobScreen;
