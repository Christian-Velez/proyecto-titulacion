/* eslint-disable */


import React, { useEffect, useState } from 'react';
import {
   VStack,
   FormControl,
   FormLabel,
   Input,
   Button,
   Heading,
   Stack,
   Textarea,
   Select
} from '@chakra-ui/react';

import { Select as SpecialSelect } from 'chakra-react-select';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { typesOfTech } from 'helpers/appCategories';


const AddNewTech = () => {
   const navigate = useNavigate();
   const { technologies } = useSelector(state => state.tech);
   const [techsHere, setTechsHere] = useState();


   console.log(techsHere);
   useEffect(() => {

      setTechsHere([
         { value: "AL", label: "Alabama" },
         { value: "AK", label: "Alaska" },
         { value: "AS", label: "American Samoa" },
         { value: "AZ", label: "Arizona" },
         { value: "AR", label: "Arkansas" },
         { value: "CA", label: "California" }

      ]);
   }, [technologies]);
   

   // Submit form
   const handleSubmitNewTech = (e) => {
      e.preventDefault();
   };


   return (
      <VStack
         padding={{ base: 7, lg: 20 }}
         spacing={20}
         alignItems='flex-start'
         w='full'
      >
         <Heading>
            Agregando nueva tecnología
         </Heading>

         <form
            style={{ width: '100%' }}
            onSubmit={handleSubmitNewTech}
         >
            <VStack
               spacing={8}
               width={{ base: 'full', lg: '60%' }}
               alignItems='flex-start'
            >
               <FormControl isRequired>
                  <FormLabel fontSize='lg'>
                     Nombre
                  </FormLabel>
                  <Input
                     type='text'
                  />
               </FormControl>

               <FormControl isRequired>
                  <FormLabel fontSize='lg'>
                     Descripcion
                  </FormLabel>
                     <Textarea
                        type='text'
                     />
               </FormControl>

               <FormControl isRequired>
                  <FormLabel fontSize='lg'>
                     Imagen
                  </FormLabel>
                     <Input
                        type='file'
                        accept='image/png, image/jpeg'
                     />
               </FormControl>

               <FormControl isRequired>
                  <FormLabel fontSize='lg'>
                     Tipo de tecnología
                  </FormLabel>

                  <Select>
                     {
                        typesOfTech.map((type, i) => <option key={i}> {type} </option>)
                     }
                  </Select>
                  
                  
               </FormControl>


               <FormControl isRequired>
                  <FormLabel fontSize='lg'>
                     Categorías
                  </FormLabel>
                  {
                           techsHere &&
                           <SpecialSelect
                              isMulti
                              options={techsHere}
                              placeholder="Seleccione las categorías..."
                              closeMenuOnSelect={false}
                              selectedOptionStyle="check"
                              hideSelectedOptions={false}
                           />                  

                        }
               </FormControl>


               <FormControl isRequired>
                  <FormLabel fontSize='lg'>
                     Tecnologías relacionadas


                  </FormLabel>
                        {
                           techsHere &&
                           <SpecialSelect
                              isMulti
                              options={techsHere}
                              placeholder="Seleccione las tecnologías..."
                              closeMenuOnSelect={false}
                              selectedOptionStyle="check"
                              hideSelectedOptions={false}
                           />                  

                        }
               </FormControl>

















               <Stack
                  width='full'
                  style={{ marginTop: '70px'}}
                  direction={{
                     base: 'column',
                     lg: 'row',
                  }}
               >
                  <Button
                     width='full'
                     size='lg'
                     variant='outline'
                     onClick={ () => navigate('/admin/technologies')}
                  >
                     Cancelar
                  </Button>
                  <Button
                     width='full'
                     size='lg'
                     type='submit'
                  >
                     Agregar
                  </Button>
               </Stack>
            </VStack>
         </form>
      </VStack>
   );
};

export default AddNewTech;
