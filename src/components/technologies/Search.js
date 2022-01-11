// Hooks
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'hooks/useForm';
import { useSearchParams } from 'react-router-dom';

// Info
import { typesOfTech } from 'helpers/appCategories';
import { searchTechs } from 'helpers/searchTechs';

// Componentes
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
import TechItem from './TechItem';
import { useSelector } from 'react-redux';

const Search = () => {
   // Recupera las tecnologias 
   const { technologies: allTechs } = useSelector(state => state.tech);

   // Parametros de busqueda
   const [searchParams, setSearchParams] = useSearchParams({});

   // Formulario de busqueda
   const [formValues, handleInputChange,, setFormValues] = useForm({
      name: '',
      type: typesOfTech[0],
      sortBy: 'Popularity'
   });
   const { sortBy, name, type } = formValues;


   const filteredTechs = useMemo(() => {
      // No utilizo los formValues debido a que cada
      // que cambiara la caja de texto se haría la busqueda

      // La busqueda solo se hace cuando presiona Enter
      const auxName = searchParams.get('name') || name;
      const auxType = searchParams.get('type') || type;

      return searchTechs(auxType, auxName, [...allTechs], sortBy);      
   }, [searchParams, sortBy]);



   // Si se recarga la pagina, recupera el Query
   useEffect(() => {
      const auxName = searchParams.get('name');
      const auxType = searchParams.get('type');

      // Comprueba que la categoria de los params exista
      const typeIndex = typesOfTech.indexOf(auxType);
      const notFound = -1;

      if(typeIndex === notFound){
         setSearchParams({});
      }
      else{
         setSearchParams({
            type: auxType,
            name: auxName,
         });

         setFormValues({
            ...formValues,
            name: auxName,
            type: typesOfTech[typeIndex]
         });
      }
   }, []);


   // Hacer click en buscar
   const handleSubmit = (e) => {
      e.preventDefault();
      setSearchParams({ type, name });
   };

   return (
      <VStack w='full' spacing={20} alignItems='flex-start' paddingBottom={50} minH='500px'>      
         <form style={{ width: '100%' }} onSubmit={ handleSubmit }>
            <HStack
               w='full'
               alignItems='flex-end'
               justifyContent='space-between'
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

               <Button
                  w='20%'
                  type='submit'
               >
                  Filtrar
               </Button>
            </HStack>
         </form>

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

Search.propTypes = {
   allTechsAvailable: PropTypes.array,
   setFilteredTechs: PropTypes.func
};

export default Search;
