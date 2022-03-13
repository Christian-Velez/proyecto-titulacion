import React from 'react';
import PropTypes from 'prop-types';
import {
   FormControl,
   FormLabel,
   HStack,
   Text,
   Select,
   VStack,
   Input,
   IconButton,
} from '@chakra-ui/react';
import { useForm } from 'hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { sortByName } from 'helpers/searchTechs';
import { SearchIcon } from '@chakra-ui/icons';
import { finishLoading, startLoading } from 'actions/ui';
import { searchDevelopers } from './search';

const SearchForm = ({
   setDevelopers,
   setFirstSearch,
}) => {
   const dispatch = useDispatch();
   const { loading } = useSelector(state => state.ui);
   const { technologies } = useSelector(state => state.tech);
   const formatedTechs = sortByName([...technologies]);

   const [ formValues, handleInputChange,,setFormValues] = useForm({
      technology: 'all',
      minYears: '0',
      maxYears: '30',
      minAge: '16',
      maxAge: '90'
   });
   const { technology, minYears, maxYears, minAge, maxAge } = formValues;


   const handleSearchDevelopers = async (e) => {
      e.preventDefault();

      if(parseInt(minYears) < 0) {
         setFormValues({
            ...formValues,
            minYears: 0
         });
      }

      if(parseInt(maxYears) > 30) {
         setFormValues({
            ...formValues,
            maxYears: 30
         });
      }

      if(parseInt(minAge) < 16) {
         setFormValues({
            ...formValues,
            minAge: 16
         });
      }

      if(parseInt(maxAge) > 90) {
         setFormValues({
            ...formValues,
            maxAge: 90
         });
      }

      setFirstSearch(true);
      dispatch(startLoading());
      const developers = await searchDevelopers(formValues);
      setDevelopers(developers);
      dispatch(finishLoading());
   };

   return (
      <VStack
         w='full'
         alignItems='flex-start'
         spacing={10}
      >
         <Text>
            Busca a desarrolladores registrados en
            la plataforma. Ingresa la tecnología
            de interés junto con los años de
            experiencia y el rango de edad para
            filtrarlos.
         </Text>

         <form
            style={{ width: '100%' }}
            onSubmit={handleSearchDevelopers}
         >
            <HStack
               w={{ base: 'full', lg: '83%' }}
               alignItems='flex-end'
               justifyContent='flex-start'
               flexWrap='wrap'
            >
               <FormControl w={{ base: '40%', md: '30%'}} isRequired>
                  <FormLabel>Tecnología</FormLabel>
                  <Select
                     color='gray.500'
                     name='technology'
                     value={ technology }
                     onChange={ handleInputChange }
                  >
                     <option key='all' value='all'> Cualquiera </option>

                     {
                        formatedTechs.map(tech => (
                           <option key={tech.id} value={ tech.id }> { tech.name } </option>
                        ))
                     }
                     
                  </Select>
               </FormControl>


               <FormControl w={{ base: '40%', md: '30%'}} isRequired>
                  <FormLabel>Años de exp.</FormLabel>

                  <HStack>
                     <Input
                        name='minYears'
                        type='number'
                        value={minYears}
                        onChange={handleInputChange}
                        min='0'
                     />

                     <Input
                        name='maxYears'
                        type='number'
                        value={maxYears}
                        max='30'
                        onChange={handleInputChange}
                     />
                  </HStack>
               </FormControl>

               <FormControl 
                  w={{ base: '40%', md: '30%'}} 
                  isRequired 
                  marginLeft={{ base: '0px !important', md: '8px !important'}}
                  marginTop={{ base: '5px !important', md: '0px'}}
               >
                  <FormLabel>Edad</FormLabel>

                  <HStack>
                     <Input
                        name='minAge'
                        type='number'
                        value={minAge}
                        onChange={handleInputChange}
                        min='16'
                     />

                     <Input
                        name='maxAge'
                        type='number'
                        value={maxAge}
                        max='90'
                        onChange={handleInputChange}
                     />
                  </HStack>
               </FormControl>

               <IconButton 
                  aria-label='Search developers'
                  icon={<SearchIcon />} 
                  onClick={handleSearchDevelopers}
                  isLoading={loading}
               />
            </HStack>
         </form>
      </VStack>
   );
};

SearchForm.propTypes = {
   setDevelopers: PropTypes.func,
   setFirstSearch: PropTypes.func,
};

export default SearchForm;
