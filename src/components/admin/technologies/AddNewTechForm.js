// Hooks
import React, {
   useEffect,
   useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTechnologyForm } from 'hooks/useTechnologyForm';
import {
   useSelector,
   useDispatch,
} from 'react-redux';

// Datos
import {
   typesOfTech,
   techCategories,
} from 'helpers/appCategories';
import { startSubmittingTechnology } from 'actions/admin/technologies';

// Estilos
import {
   VStack,
   FormControl,
   FormLabel,
   Input,
   Textarea,
   Select,
} from '@chakra-ui/react';
import { Select as SpecialSelect } from 'chakra-react-select';
import Swal from 'sweetalert2';
import { transformTechnologiesFormat } from 'helpers/transformTechnologiesFormat';
import Buttons from 'components/forms/Buttons';
import ProfilePhoto from 'components/ProfilePhoto';

const AddNewTechForm = () => {
   const [isLoading, setIsLoading] =
      useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { technologies } = useSelector(
      (state) => state.tech
   );

   // Transforma las tecnologias al formato que se necesita en el SpecialSelect
   const [
      allTechsAvailable,
      setAllTechsAvailable,
   ] = useState();

   useEffect(() => {
      const auxTechs =
         transformTechnologiesFormat(
            technologies
         );
      setAllTechsAvailable(auxTechs);
   }, [technologies]);

   // Controla los campos seleccionados
   const [
      formValues,
      handleInputChange,
      img,
      setImg,
      categories,
      setCategories,
      relatedTechs,
      setRelatedTechs,
   ] = useTechnologyForm(typesOfTech[0]);
   const { name, description, type } = formValues;

   // Submit form
   const handleSubmitNewTech = (e) => {
      e.preventDefault();
      if (
         !name ||
         !description ||
         !img ||
         !type ||
         !categories ||
         categories.length === 0
      ) {
         Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Rellene todos los campos solicitados',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });
      } else {
         dispatch(
            startSubmittingTechnology(
               name,
               description,
               img,
               type,
               categories,
               relatedTechs,
               navigate,
               setIsLoading
            )
         );
      }
   };
   return (
      <form
         style={{ width: '100%' }}
         onSubmit={handleSubmitNewTech}
      >
         <VStack
            spacing={8}
            width={{ base: 'full', lg: '60%' }}
            alignItems='flex-start'
         >
            <ProfilePhoto
               text='Icono'
               current={img}
               setProfilePhoto={setImg}
               isRounded={false}
               isRequired={true}
            />
           

            <FormControl isRequired>
               <FormLabel fontSize='lg'>
                  Nombre
               </FormLabel>
               <Input
                  type='text'
                  name='name'
                  value={name}
                  onChange={handleInputChange}
               />
            </FormControl>

            <FormControl isRequired>
               <FormLabel fontSize='lg'>
                  Descripción
               </FormLabel>
               <Textarea
                  name='description'
                  value={description}
                  onChange={handleInputChange}
                  type='text'
               />
            </FormControl>

            <FormControl isRequired>
               <FormLabel fontSize='lg'>
                  Tipo de tecnología
               </FormLabel>

               <Select
                  name='type'
                  value={type}
                  onChange={handleInputChange}
               >
                  {typesOfTech.map((type, i) => (
                     <option key={i}>
                        {type}
                     </option>
                  ))}
               </Select>
            </FormControl>

            <FormControl isRequired>
               <FormLabel fontSize='lg'>
                  Categorías
               </FormLabel>
               <SpecialSelect
                  isMulti
                  name='categories'
                  placeholder='Seleccione las categorías...'
                  closeMenuOnSelect={false}
                  selectedOptionStyle='check'
                  hideSelectedOptions={false}
                  options={techCategories}
                  value={categories}
                  onChange={setCategories}
               />
            </FormControl>

            <FormControl>
               <FormLabel fontSize='lg'>
                  Tecnologías relacionadas
               </FormLabel>
               {allTechsAvailable && (
                  <SpecialSelect
                     isMulti
                     name='relatedTechs'
                     placeholder='Seleccione las tecnologías...'
                     closeMenuOnSelect={false}
                     selectedOptionStyle='check'
                     hideSelectedOptions={false}
                     options={allTechsAvailable}
                     value={relatedTechs}
                     onChange={setRelatedTechs}
                  />
               )}
            </FormControl>

            <Buttons
               cancelRoute='/admin/technologies'
               actionText='Agregar'
               isLoading={isLoading}
            />
         </VStack>
      </form>
   );
};

export default AddNewTechForm;
