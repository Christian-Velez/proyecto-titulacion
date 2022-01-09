import {
   Flex, VStack,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import FilterContent from './FilterContent';
import MobileFilter from './MobileFilter';






const Filters = ({ filters, setFilters, filtersModal }) => {
   return (
      <Flex w={{ base: '100%', '2xl': '20%' }}>


         {/*Filtro en dispositivos grandes*/}
         <VStack
            display={{ base: 'none', '2xl': 'flex' }}
            w='full'
            color='gray.600'
            alignItems='flex-start'
            spacing={10}

            paddingX={10}
         >  
            <FilterContent filters={filters} setFilters={setFilters}/>
         </VStack>


         {/*Filtro en dispositivos pequeños*/}
         <MobileFilter filtersModal={filtersModal} filters={filters} setFilters={setFilters}/> 

        
      </Flex>
   );
};


Filters.propTypes = {
   filters: PropTypes.object,
   setFilters: PropTypes.func,
   filtersModal: PropTypes.object
};

export default Filters;
