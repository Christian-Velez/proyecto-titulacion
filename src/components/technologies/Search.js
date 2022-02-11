// Hooks
import React, { useMemo } from 'react';
import { useForm } from 'hooks/useForm';

// Info
import { typesOfTech } from 'helpers/appCategories';
import { searchTechs } from 'helpers/searchTechs';

// Componentes
import { Search2Icon } from '@chakra-ui/icons';
import {
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
import TechItem from './TechItem';
import { useSelector } from 'react-redux';

const Search = () => {
   // Recupera las tecnologias 
   const { technologies: allTechs } = useSelector(state => state.tech);

   // Formulario de busqueda
   const [ formValues, handleInputChange ] = useForm({
      name: '',
      type: typesOfTech[0],
      sortBy: 'Popularity'
   });
   const { sortBy, name, type } = formValues;


   const filteredTechs = useMemo(() => {
      return searchTechs(type, name, [...allTechs], sortBy);      
   }, [ allTechs, name, sortBy, type ]);


   return (
      <VStack w='full' spacing={20} alignItems='flex-start' paddingBottom={50} minH='500px'>      
            <HStack
               w='full'
               alignItems='flex-end'
               justifyContent='flex-start'
               spacing={10}
            >
               <FormControl w='40%'>
                  <FormLabel>Nombre</FormLabel>
                  <InputGroup>
                     <InputLeftElement>
                        <Search2Icon color='gray.500' />
                     </InputLeftElement>

                     <Input
                        name='name'
                        value={name}
                        onChange={ handleInputChange }
                     />
                  </InputGroup>
               </FormControl>

               <FormControl w='30%'>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                     color='gray.500'
                     name='type'
                     value={type}
                     onChange={ handleInputChange }
                  >
                     {typesOfTech.map((type, i) => (
                        <option key={i}>
                           {type}
                        </option>
                     ))}
                  </Select>
               </FormControl>
            </HStack>

         <VStack spacing={5} w='full' alignItems='flex-start'>
            <Text> {filteredTechs.length} { filteredTechs.length === 1 ? 'resultado' : 'resultados'} </Text> 
            <Text>Ordenar por</Text> 
            <Select w={{ base: '50%', lg:'20%'}} name='sortBy' value={ sortBy } onChange={ handleInputChange }>
               <option value='Popularity'>Popularidad</option>
               <option value='Name'>Nombre</option>
            </Select>

            {
               filteredTechs.map(tech => <TechItem key={tech.id} technology={tech} />)
            }
         </VStack>
      </VStack>

   );
};

export default Search;
