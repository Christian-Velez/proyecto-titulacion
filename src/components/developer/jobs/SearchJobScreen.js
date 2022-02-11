// Hooks 
import React, {
   useEffect,
   useMemo,
   useState,
} from 'react';
import {
   useDispatch,
   useSelector,
} from 'react-redux';


// Actions
import { startLoadingJobs } from 'actions/developer/jobs';
import { filterJobs } from 'helpers/developer/filterJobs';

// Componentes
import LoadingScreen from 'components/LoadingScreen';
import JobItem from './JobItem';
import Filters from './Filters';
import Search from './Search';
import {
   Divider,
   Flex,
   Heading,
   HStack,
   Stack,
   useDisclosure,
   VStack,
} from '@chakra-ui/react'
;
import { Outlet } from 'react-router-dom';


const SearchJobScreen = () => {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(true);

   // Todos los trabajos disponibles
   const { allJobs, isJobSelected } = useSelector(state => state.devJobs);

   // Utilizado para abrir los filtros en dispositivos pequeños
   // Lo controla un boton dentro del componente Search
   const filtersModal = useDisclosure();



   // Trabajos con los filtros aplicados
   const [filters, setFilters] = useState({
      title: '',
      categories: [],
      salary: [0, 5000],
   });

   const filteredJobs = useMemo(
      () => filterJobs([...allJobs], filters),
      [allJobs, filters]
   );
   


   // Solo cuando recarga la aplicacion se vuelven a pedir todos los trabajos
   useEffect(() => {
      if (allJobs.length === 0) {
         Promise.all([
            dispatch(startLoadingJobs()),
         ]).then(() => {
            setIsLoading(false);
         });
      } else {
         setIsLoading(false);
      }
   }, [dispatch, allJobs]);


   return (

      <HStack 
         minH='100vh'
         w='full' 
         spacing={0}
         alignItems='flex-start' style={{
         margin: 0
      }}>

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

            <Divider />

            { (isLoading && filteredJobs.length === 0)? (
               <LoadingScreen />
            ) : (

               <VStack
                  alignItems='flex-start'
                  spacing={20}
                  w='full'
               >
                  
                  {/*Buscador*/}
                  <Search filters={filters} setFilters={setFilters} filtersModal={filtersModal}/>

                  <Stack
                     w='full'
                     direction={{
                        base: 'column',
                        '2xl': 'row',
                     }}
                     justifyContent={{ '2xl': 'space-between'}}
                  >
                     <Filters
                        filters={filters}
                        setFilters={setFilters}
                        filtersModal={filtersModal}
                     />

                     <VStack
                        spacing={5}
                        w={{
                           base: '100%',
                           '2xl': '75%',
                        }}
                     >
                        {filteredJobs.map((job) => (
                           <JobItem
                              key={job.id}
                              job={job}
                           />
                        ))}
                     </VStack>
                  </Stack>
               </VStack>
            )}
         </VStack>


         <Flex 
            display={{ base: !isJobSelected && 'none', '2xl': 'flex' }}
            maxH={{ '2xl': '100vh'}}
            overflowY={{ '2xl': 'scroll'}}  
            w={{ base:'full', '2xl': '25%'}}
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
