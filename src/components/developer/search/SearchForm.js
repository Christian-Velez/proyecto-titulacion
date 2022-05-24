

import PropTypes from 'prop-types';
import { Search2Icon, SearchIcon } from '@chakra-ui/icons';
import {
   FormControl,
   FormLabel,
   HStack,
   IconButton,
   Input,
   InputGroup,
   InputLeftElement,
   Select,
   Text,
   VStack,
} from '@chakra-ui/react';
import { sortByName } from 'helpers/searchTechs';
import { useForm } from 'hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { searchCompanies } from './search';
import { finishLoading, startLoading } from 'actions/ui';

const SearchForm = ({ setCompanies, setFirstSearch }) => {
   const dispatch = useDispatch();
   const { technologies } = useSelector(state => state.tech);
   const formatedTechs = sortByName([...technologies]);

   const [ formValues, handleInputChange,,setFormValues] = useForm({
      name: '',
      technology: 'all',
      min: '0',
      max: '30'
   });
   const { name, technology, min, max } = formValues;

   const handleSearchCompany = async (e) => {
      e.preventDefault();

      if(parseInt(min) < 0) {
         setFormValues({
            ...formValues,
            min: 0
         });
      }

      if(parseInt(max) > 30) {
         setFormValues({
            ...formValues,
            max: 30
         });
      }

      console.log(formValues);
      setFirstSearch(true);
      dispatch(startLoading());
      const companies = await searchCompanies(formValues);
      setCompanies(companies);
      dispatch(finishLoading());
   };

   return (
      <VStack w='full' alignItems='flex-start' spacing={10}>
         <Text>
            Busca a las empresas registradas en la plataforma.
            Ingresa el nombre y/o la tecnología que generalmente solicita
            junto con los años de experiencia
         </Text>

         <form
            style={{ width: '100%'}}
            onSubmit={ handleSearchCompany }
         >
            <HStack
               w={{ base: 'full', lg: '80%'}}
               alignItems='flex-end'
            >
               <FormControl w='40%'>
                  <FormLabel> Nombre </FormLabel>

                  <InputGroup>
                     <InputLeftElement>
                        <Search2Icon color='gray.500' />
                     </InputLeftElement>

                     <Input
                        value={name}
                        onChange={ handleInputChange }
                        name='name'
                        placeholder='Todas las empresas'
                     />
                  </InputGroup>
               </FormControl>

               <FormControl w='30%' isRequired>
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

                  
               <FormControl w='30%' isRequired>
                  <FormLabel>Años de exp. (0 - 30)</FormLabel>

                  <HStack>
                     <Input
                        name='min'
                        value={min}
                        type='number'
                        onChange={handleInputChange}
                        min='0'
                     />

                     <Input
                        name='max'
                        value={max}
                        type='number'
                        max='30'
                        onChange={handleInputChange}
                     />
                  </HStack>
               </FormControl>


               <IconButton 
                  aria-label='Search developers'
                  icon={<SearchIcon />} 
                  type='submit'
               />
            </HStack>
         </form>
      </VStack>
   );
};

SearchForm.propTypes = {
   setCompanies: PropTypes.func,
   setFirstSearch: PropTypes.func
};

export default SearchForm;