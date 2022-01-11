import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, HStack, IconButton, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { HiAdjustments } from 'react-icons/hi';
const Search = ({ filters, setFilters, filtersModal}) => {
   
   
   const { onOpen } = filtersModal;

   
   
   const [title, setTitle] = useState(filters.title);

   const handleTitleChange = (e) => {
      setTitle(e.target.value);
   };

   const handleSearchByTitle = (e) => {
      e.preventDefault();
      setFilters({
         ...filters,
         title
      });
   };

   return (
      <HStack 
         w='full'
      >
         <form
            style={{ width: '100%'}}
            onSubmit={ handleSearchByTitle }
         >
            <HStack w='full'>

               <InputGroup>
                  <InputLeftElement>
                     <Search2Icon color='gray.500' />
                  </InputLeftElement>

                  <Input
                     value={title}
                     onChange={ handleTitleChange }
                     name='name'
                     placeholder='e.g: React'
                  />
               </InputGroup>
               <Button type='submit'>Buscar</Button>


               {/*Se utiliza para abrir los filtros en dispositivos moviles*/}
               <IconButton 
                  aria-label='Filters'
                  icon={<HiAdjustments />}
                  variant='outline'
                  display={{ base: 'flex', '2xl': 'none'}}
                  onClick={onOpen}
               />

            </HStack>


         </form>

      </HStack>
   );
};

Search.propTypes = {
   filters: PropTypes.object,
   setFilters: PropTypes.func,
   filtersModal: PropTypes.object
};

export default Search;
