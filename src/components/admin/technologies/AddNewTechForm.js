// Hooks
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTechnologyForm } from 'hooks/useTechnologyForm';
import {
   useSelector,
   useDispatch,
} from 'react-redux';

// Datos, helpers, actions
import {
   typesOfTech,
   techCategories,
} from 'helpers/appCategories';
import { startSubmittingTechnology } from 'actions/admin/technologies';
import { startLoading } from 'actions/ui';
import { formatTechnologyToDB } from 'helpers/admin/formatTechnologyToDB';
import { errorAlert } from 'helpers/SwalAlerts';
import { isTechnologyFormValid } from 'helpers/admin/isFormValid';


// Componentes
import ProfilePhoto from 'components/layout/ProfilePhoto';
import Buttons from 'components/forms/Buttons';
import BasicInput from 'components/forms/BasicInput';
import { transformTechnologiesFormat } from 'helpers/admin/transformTechnologiesFormat';
import {
   VStack,
   FormControl,
   FormLabel,
   Textarea,
   Select,
} from '@chakra-ui/react';
import { Select as SpecialSelect } from 'chakra-react-select';

const AddNewTechForm = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   
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
   ] = useTechnologyForm({
      initialType: typesOfTech[0]
   });
   const { name, description, type } = formValues;


   const handleSubmitNewTech = async (e) => {
      e.preventDefault();

      const techInfo = { name, description, img, type, categories, relatedTechs };

      if(!isTechnologyFormValid(techInfo)) {
         return errorAlert({ message: 'Rellene todos los campos solicitados '});
      }

      dispatch(startLoading());
      const formatedTech = await formatTechnologyToDB(techInfo);
      dispatch(startSubmittingTechnology( formatedTech, navigate ));
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

            <BasicInput text='Nombre' name='name' value={name} onChange={handleInputChange}/>

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
            />
         </VStack>
      </form>
   );
};

export default AddNewTechForm;
