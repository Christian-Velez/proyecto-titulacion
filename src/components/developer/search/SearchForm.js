


import { Search2Icon } from '@chakra-ui/icons';
import {
   Button,
   FormControl,
   FormLabel,
   HStack,
   Input,
   InputGroup,
   InputLeftElement,
   Select,
   Text,
   VStack,
} from '@chakra-ui/react';
import { sortByName } from 'helpers/searchTechs';
import { useForm } from 'hooks/useForm';
import { useSelector } from 'react-redux';

const SearchForm = () => {
   const { technologies } = useSelector(state => state.tech);
   const formatedTechs = sortByName([...technologies]);

   const [ formValues, handleInputChange,,setFormValues] = useForm({
      name: '',
      technology: 'all',
      min: '0',
      max: '30'
   });
   const { name, technology, min, max } = formValues;

   const handleSearchCompany = (e) => {
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

      console.log('submiteao');

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
                        placeholder='e.g: Microsoft'
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
                        onChange={handleInputChange}
                        min='0'
                     />

                     <Input
                        name='max'
                        value={max}
                        max='30'
                        onChange={handleInputChange}
                     />
                  </HStack>
               </FormControl>


               <Button type='submit' display='none'></Button>
            </HStack>
         </form>
      </VStack>
   );
};

export default SearchForm;