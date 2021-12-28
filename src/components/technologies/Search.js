// Hooks
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'hooks/useForm';
import { useSearchParams } from 'react-router-dom';

// Info
import { typesOfTech } from 'helpers/appCategories';
import { searchTechs, sortByName, sortByPopularity } from 'helpers/searchTechs';

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

const Search = ({ allTechsAvailable }) => {
   // Busqueda
   const [searchParams, setSearchParams] = useSearchParams({});
   const [filteredTechs, setFilteredTechs] = useState([]);


   // Formulario de busqueda
   const [formValues, handleInputChange,, setFormValues] = useForm({
      name: '',
      type: typesOfTech[0],
      sortBy: 'Popularity'
   });
   const { sortBy, name, type } = formValues;

   // Si se recarga la pagina con url con query, recupera los resultados
   const [ queryExists, setQueryExists ] = useState(false);
   useEffect(() => {
      const auxName = searchParams.get('name');
      const auxType = searchParams.get('type');

      // Comprueba que la categoria de los params exista
      const typeIndex = typesOfTech.indexOf(auxType);
      const notFound = -1;

      // Si NO hay query
      if(typeIndex === notFound){
         setSearchParams({});

         // Le mando una copia del Array con spread operator para que no afecte el REDUX STORE   
         setFilteredTechs(sortByPopularity([...allTechsAvailable]));
      }

      // Si hay query
      else{
         setFormValues({
            name: auxName,
            type: typesOfTech[typeIndex]
         });
         setQueryExists(true);
      }
   }, []);

   useEffect(()=>{
      // Realiza la busqueda al recargar la pagina

      if(queryExists){
         searchTechs(type, name , allTechsAvailable, setFilteredTechs);
      }
   }, [queryExists]);




   useEffect(()=> {
      if(sortBy === 'Popularity' && filteredTechs.length > 0) {
         setFilteredTechs(sortByPopularity([...filteredTechs]));
      }
      
      if(sortBy === 'Name' && filteredTechs.length > 0){
         setFilteredTechs(sortByName([...filteredTechs]));
      }
   }, [sortBy]);






   // Hacer click en buscar
   const handleSubmit = (e) => {
      e.preventDefault();
      setSearchParams({ type, name });
      searchTechs(type, name, allTechsAvailable, setFilteredTechs, sortBy);
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
         <Text> {filteredTechs.length} resultados </Text> 
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
