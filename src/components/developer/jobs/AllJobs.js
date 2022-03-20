import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Stack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import JobItem from './JobItem';
import Filters from './Filters';
import { filterJobs } from 'helpers/developer/filterJobs';
import Search from './Search';

const AllJobs = ({ allJobs }) => {
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

   return (
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
               {
                  filteredJobs.length === 0
                     ? <Text> Sin resultados </Text>
                     :
                        filteredJobs.map((job) => (
                           <JobItem
                              key={job.id}
                              job={job}
                           />
                        ))
               
               }
            </VStack>
         </Stack>
      </VStack>
   );
};

AllJobs.propTypes = {
   allJobs: PropTypes.array,
};

export default AllJobs;
