import React from 'react';

import {
   FormControl,
   FormHelperText,
   FormLabel,
   Heading,
   Select,
   Textarea,
   VStack,
} from '@chakra-ui/react';
import BasicInput from 'components/BasicInput';
import { useForm } from 'hooks/useForm';


import { techCategories } from 'helpers/appCategories';

const NewJobOfferScreen = () => {
   const [formValues, handleInputChange] =
      useForm({
         title: '',
         description: '',
      });
   const { title, description } = formValues;

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log('enviado');
   };

   return (
      <VStack
         padding={{ base: 7, lg: 20 }}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
      >
         <Heading
            fontSize={{ base: '2xl', lg: '3xl' }}
         >
            Publicar oferta
         </Heading>

         <form
            onSubmit={handleSubmit}
            style={{ width: '100%' }}
         >
            <VStack
               alignItems='flex-start'
               spacing={8}
               w={{ base: 'full', lg: '60%' }}
            >
               <BasicInput
                  text='Título'
                  name='title'
                  value={title}
                  onChange={handleInputChange}
                  maxLength={30}
                  helperText='Asegúrate de que sea descriptivo, los postulantes buscarán la oferta haciendo referencia al título.'
               />

               <FormControl isRequired>
                  <FormLabel fontSize='lg'>
                     Descripción
                  </FormLabel>
                  <Textarea
                     type='text'
                     name='description'
                     value={description}
                     onChange={handleInputChange}
                     maxLength={350}
                  />

                  <FormHelperText>
                     Incluye detalles adicionales
                     acerca de la vacante.
                  </FormHelperText>
               </FormControl>

               <FormControl isRequired>
                  <FormLabel fontSize='lg'>
                     Categoría
                  </FormLabel>
                  <Select>
                     {
                        techCategories.map((cat, i) => <option key={i}> {cat.label} </option> )
                     }
                  </Select>
               </FormControl>
            </VStack>
         </form>
      </VStack>
   );
};

export default NewJobOfferScreen;
