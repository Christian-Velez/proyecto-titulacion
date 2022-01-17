// Hooks
import React, {
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
import { transformTechnologiesFormat } from 'helpers/transformTechnologiesFormat';
import Buttons from 'components/forms/Buttons';
import ProfilePhoto from 'components/ProfilePhoto';
import { isTechnologyFormValid } from 'helpers/admin/isFormValid';
import { errorAlert, successAlert } from 'helpers/SwalAlerts';

const AddNewTechForm = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [isSubmitting, setIsSubmitting] = useState(false);
   
   // Transforma las tecnologias al formato que se necesita en el SpecialSelect
   const { technologies } = useSelector(state => state.tech);
   const allTechs = transformTechnologiesFormat(technologies);

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


   const handleSubmitNewTech = (e) => {
      e.preventDefault();

      const techInfo = { name, description, img, type, categories, relatedTechs };

      if(!isTechnologyFormValid(techInfo)) {
         return errorAlert({ message: 'Rellene todos los campos solicitados '});
      }

      setIsSubmitting(true);
      dispatch(startSubmittingTechnology({ techInfo}))
         .then(() => {
            navigate('/admin/technologies');
            successAlert({ message: 'Tecnología añadida'});
         })
         .catch(err => {
            console.log(err);
            errorAlert({ message: 'Ocurrio un error al tratar de agregar la tecnología'});
         });
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
               {allTechs && (
                  <SpecialSelect
                     isMulti
                     name='relatedTechs'
                     placeholder='Seleccione las tecnologías...'
                     closeMenuOnSelect={false}
                     selectedOptionStyle='check'
                     hideSelectedOptions={false}
                     options={allTechs}
                     value={relatedTechs}
                     onChange={setRelatedTechs}
                  />
               )}
            </FormControl>

            <Buttons
               cancelRoute='/admin/technologies'
               actionText='Agregar'
               isLoading={isSubmitting}
            />
         </VStack>
      </form>
   );
};

export default AddNewTechForm;
