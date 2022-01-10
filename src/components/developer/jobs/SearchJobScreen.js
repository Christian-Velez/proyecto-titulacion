import React, {
   useEffect,
   useState,
} from 'react';
import {
   Divider,
   Heading,
   Stack,
   useDisclosure,
   VStack,
} from '@chakra-ui/react';
import {
   useDispatch,
   useSelector,
} from 'react-redux';
import { startLoadingJobs } from 'actions/developer/jobs';
import LoadingScreen from 'components/LoadingScreen';
import JobItem from './JobItem';
import Filters from './Filters';
import { filterJobs } from 'helpers/filterJobs';
import Search from './Search';

const SearchJobScreen = () => {
   // Utilizado para abrir los filtros en dispositivos pequeños
   // Lo controla un boton dentro del componente Search
   const filtersModal = useDisclosure();



   const dispatch = useDispatch();
   const [isLoading, setIsLoading] =
      useState(true);

   // Todos los trabajos disponibles
   const { allJobs } = useSelector(
      (state) => state.devJobs
   );

   // Trabajos con los filtros aplicados
   const [filters, setFilters] = useState({
      title: '',
      categories: [],
      salary: [0, 5000],
   });

   const [filteredJobs, setFilteredJobs] =
      useState([]);

   useEffect(() => {
      // Solo cuando recarga la aplicacion se vuelven a pedir todos los trabajos

      if (allJobs.length === 0) {
         Promise.all([
            dispatch(startLoadingJobs()),
         ]).then(() => {
            setIsLoading(false);
         });
      } else {
         setIsLoading(false);
      }
   }, []);

   useEffect(() => {
      if (allJobs.length > 0) {
         setFilteredJobs(
            filterJobs([...allJobs], filters)
         );
      }
   }, [allJobs]);

   useEffect(() => {
      if (allJobs.length > 0) {
         setFilteredJobs(
            filterJobs([...allJobs], filters)
         );
      }
   }, [filters]);



   return (
      <VStack
         padding={{ base: 7, lg: 20 }}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
         minH='100vh'
      >
         <Heading
            fontSize={{ base: '2xl', lg: '3xl' }}
         > Empleos </Heading>

         <Divider />

         {isLoading && filteredJobs.length ? (
            <LoadingScreen />
         ) : (
            <VStack
               w='full'
               alignItems='flex-start'
               spacing={20}
            >
               {/*Buscador*/}
               <Search filters={filters} setFilters={setFilters} filtersModal={filtersModal}/>

               <Stack
                  w='full'
                  direction={{
                     base: 'column',
                     '2xl': 'row',
                  }}
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
                        '2xl': '80%',
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
   );
};

export default SearchJobScreen;
