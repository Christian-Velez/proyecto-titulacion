// Hooks
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Info
import { typesOfTech } from 'helpers/appCategories';

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
} from '@chakra-ui/react';
import { useForm } from 'hooks/useForm';
import { useSearchParams } from 'react-router-dom';
import { searchTechs } from 'helpers/searchTechs';

const Search = ({ allTechsAvailable }) => {
   const [searchParams, setSearchParams] = useSearchParams({});

   
   const [formValues, handleInputChange,, setFormValues] = useForm({
      name: '',
      type: typesOfTech[0]
   });
   const { name, type } = formValues;

      
   const [filteredTechs, setFilteredTechs] = useState([]);
   const [orderBy, setOrderBy] = useState('Name');


   // Si se recarga la pagina con url con query, recupera los resultados
   const [ queryExists, setQueryExists ] = useState(false);
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
         setFormValues({
            name: auxName,
            type: typesOfTech[typeIndex]
         });
         setQueryExists(true);
      }
   }, []);

   useEffect(()=>{
      // Realiza la busqueda al recargar la pagina
      // Espera a que useSelector recupere las tecnologias disponibles
      if(queryExists && allTechsAvailable.length > 0){
         searchTechs(type, name , allTechsAvailable, setFilteredTechs);
      }
   }, [allTechsAvailable, queryExists]);


   // Hacer click en buscar
   const handleSubmit = (e) => {
      e.preventDefault();
      setSearchParams({ type, name });
      searchTechs(type, name, allTechsAvailable, setFilteredTechs);
   };




   return (
      <form style={{ width: '100%' }} onSubmit={ handleSubmit }>
         <HStack
            w='full'
            alignItems='flex-end'
         >
            <FormControl w='40%'>
               <FormLabel>Nombre</FormLabel>
               <InputGroup>
                  <InputLeftElement>
                     <Search2Icon color='gray.500' />
                  </InputLeftElement>

                  <Input
                     placeholder='Java...'
                     name='name'
                     value={name}
                     onChange={(e) => {
                        handleInputChange(e);
                        //handleSubmit();
                     }}
                  />
               </InputGroup>
            </FormControl>

            <FormControl w='30%'>
               <FormLabel>Tipo</FormLabel>
               <Select
                  color='gray.500'
                  name='type'
                  value={type}
                  onChange={(e) => {
                     handleInputChange(e);
                     //handleSubmit();
                  }}
               >
                  {typesOfTech.map((type, i) => (
                     <option key={i}>
                        {type}{' '}
                     </option>
                  ))}
               </Select>
            </FormControl>

            <Button
               w='20%'
               type='submit'
            >
               Buscar
            </Button>
         </HStack>
      </form>
   );
};

Search.propTypes = {
   allTechsAvailable: PropTypes.array
};

export default Search;
