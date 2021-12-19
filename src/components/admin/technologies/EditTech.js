// Hooks
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   useNavigate,
   useParams,
} from 'react-router-dom';
import { useTechnologyForm } from 'hooks/useTechnologyForm';

// Estilo
import {
   Button,
   FormControl,
   FormHelperText,
   FormLabel,
   Heading,
   Input,
   Select,
   Stack,
   Textarea,
   VStack,
} from '@chakra-ui/react';
import { Select as SpecialSelect } from 'chakra-react-select';
import Swal from 'sweetalert2';


// Datos
import { typesOfTech, techCategories } from 'helpers/appCategories';
import { transformTechnologiesFormat } from 'helpers/transformTechnologiesFormat';
import { startUpdatingTech } from 'actions/admin/technologies';

const EditTech = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
  
   // Todas las tecnologias guardadas en el store
   const { technologies } = useSelector((state) => state.tech);

   // Tecnologia actual a editar
   const technology = technologies.find(tech => tech.id === id);

   // Todas las tecnologias con el formato requerido
   const [techsHere, setTechsHere] = useState();

   // Transforma las tecnologias al formato que se necesita en el SpecialSelect
   useEffect(() => {
      const auxTechs = transformTechnologiesFormat(technologies);
      setTechsHere(auxTechs);
   }, [technologies]);

   // Valores del formulario
   const [
      formValues,
      handleInputChange,
      img,
      setImg,
      categories,
      setCategories,
      relatedTechs,
      setRelatedTechs,
      setFormValues
   ] = useTechnologyForm();

   // Actualiza los formValues con la info de la tecnología actual
   useEffect(() => {
      if(technology){
         setFormValues({
            name: technology.name,
            description: technology.description,
            type: technology.type
         });

         const relatedTechsFormated = transformTechnologiesFormat(technology.relatedTechs);
         const categoriesFormated = technology.categories.map(cat => {
            return {
               value: cat,
               label: cat
            };
         });
      
         setCategories(categoriesFormated);
         setRelatedTechs(relatedTechsFormated);
         setImg(technology.img);
      }
   }, [technology]);
   const { name, description, type } = formValues;


   //
   const handleEditTech = (e) => {
      e.preventDefault();
      
      if (!name || !description || !type || !categories || categories.length === 0) {
         Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Rellene todos los campos solicitados',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });
      } else {
         dispatch(startUpdatingTech(id, name, description, img, type, categories, relatedTechs, navigate));
      }

   };

   return (
      <VStack
         padding={{ base: 7, lg: 20 }}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
      >
         <Heading>
            Editando {technology && technology.name}
         </Heading>

         <form 
            style={{ width: '100%' }}
            onSubmit={ handleEditTech }   
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
                     name='name'
                     value={name}
                     onChange={ handleInputChange }
                  />
               </FormControl>

               <FormControl isRequired>
                  <FormLabel fontSize='lg'>
                     Descripción
                  </FormLabel>
                  <Textarea
                     name='description'
                     type='text'
                     value={description}
                     onChange={ handleInputChange }
                  />
               </FormControl>

               <FormControl>
                  <FormLabel fontSize='lg'>
                     Icono
                  </FormLabel>
                  <Input
                     type='file'
                     id='img'
                     accept='image/png, image/jpeg, .svg'
                     onChange={(e) => {
                     setImg(
                        e.target.files[0]
                     );
                  }}
                  />
                  <FormHelperText> Si no adjuntas ninguna imagen, se quedará con la anterior </FormHelperText>
               </FormControl>

               <FormControl isRequired>
                  <FormLabel fontSize='lg'>
                     Tipo de tecnología
                  </FormLabel>

                  <Select
                     name='type'
                     value={type}
                     onChange={ handleInputChange }
                  >
                     {typesOfTech.map(
                        (type, i) => (
                           <option key={i}>
                              {type}
                           </option>
                        )
                     )}
                  </Select>
               </FormControl>

               <FormControl isRequired>
                  <FormLabel fontSize='lg'>
                     Categorías
                  </FormLabel>
                  <SpecialSelect
                        isMulti
                        placeholder='Seleccione las categorías...'
                        closeMenuOnSelect={false}
                        selectedOptionStyle='check'
                        hideSelectedOptions={false}

                        options={ techCategories }
                        value={ categories }
                        onChange={ setCategories }
                     />
               </FormControl>

               <FormControl>
                  <FormLabel fontSize='lg'>
                     Tecnologías relacionadas
                  </FormLabel>

                  {techsHere && (
                     <SpecialSelect
                        isMulti
                        placeholder='Seleccione las tecnologías...'
                        closeMenuOnSelect={false}
                        selectedOptionStyle='check'
                        hideSelectedOptions={false}


                        options={techsHere}
                        value={ relatedTechs }   
                        onChange={ setRelatedTechs }
                     />
                  )}

                  
                  
               </FormControl>

               <Stack
                  width='full'
                  style={{ marginTop: '70px' }}
                  direction={{
                     base: 'column',
                     lg: 'row',
                  }}
               >
                  <Button
                     width='full'
                     size='lg'
                     variant='outline'
                     onClick={() =>
                        navigate(
                           '/admin/technologies'
                        )
                     }
                  >
                     Cancelar
                  </Button>
                  <Button
                     width='full'
                     size='lg'
                     type='submit'
                  >
                     Guardar
                  </Button>
               </Stack>
            </VStack>
         </form>
      </VStack>
   );
};

export default EditTech;
