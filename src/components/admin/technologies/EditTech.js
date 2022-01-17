// Hooks
import React, {
   useEffect,
   useState,
} from 'react';
import {
   useDispatch,
   useSelector,
} from 'react-redux';
import {
   useNavigate,
   useParams,
} from 'react-router-dom';
import { useTechnologyForm } from 'hooks/useTechnologyForm';

// Estilo
import {
   FormControl,
   FormLabel,
   Heading,
   Input,
   Select,
   Textarea,
   VStack,
} from '@chakra-ui/react';
import { Select as SpecialSelect } from 'chakra-react-select';

// Datos
import {
   typesOfTech,
   techCategories,
} from 'helpers/appCategories';
import { transformTechnologiesFormat } from 'helpers/transformTechnologiesFormat';
import { startUpdatingTech } from 'actions/admin/technologies';
import Buttons from 'components/forms/Buttons';
import ProfilePhoto from 'components/ProfilePhoto';
import { isTechnologyFormValid } from 'helpers/admin/isFormValid';
import { errorAlert, successAlert } from 'helpers/SwalAlerts';

const EditTech = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { id } = useParams();
   const [isSaving, setIsSaving] = useState(false);

   const { technologies: allTechs } = useSelector(state => state.tech);
   const technology = allTechs.find((tech) => tech.id === id);
   const formatedTechs = transformTechnologiesFormat(allTechs);

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
      setFormValues,
   ] = useTechnologyForm();

   // Actualiza los formValues con la info de la tecnología actual
   useEffect(() => {
      if (technology) {
         setFormValues({
            name: technology.name,
            description: technology.description,
            type: technology.type,
         });

         const relatedTechsFormated =
            transformTechnologiesFormat(
               technology.relatedTechs
            );
         const categoriesFormated =
            technology.categories.map((cat) => {
               return {
                  value: cat,
                  label: cat,
               };
            });

         setCategories(categoriesFormated);
         setRelatedTechs(relatedTechsFormated);
         setImg(technology.img);
      }
   }, [technology]);

   const { name, description, type } = formValues;

   const handleEditTech = (e) => {
      e.preventDefault();

      const techInfo = { id, name, description, img, type, categories, relatedTechs };

      if(!isTechnologyFormValid(techInfo)) {
         return errorAlert({ message: 'Rellene todos los campos solicitados'});
      }

      setIsSaving(true);
      dispatch(startUpdatingTech({ techInfo, navigate, setIsSaving}))
         .then(() => {
            setIsSaving(false);
            successAlert({ message: 'Tecnología editada' });
            navigate('/admin/technologies');
         })
         .catch((err) => {
            setIsSaving(false);
            console.log(err);
            errorAlert({ message: 'Ocurrio un error al tratar de editar la tecnología' });
         });
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
            Editando{' '}
            {technology && technology.name}
         </Heading>

         <form
            style={{ width: '100%' }}
            onSubmit={handleEditTech}
         >
            <VStack
               spacing={8}
               width={{ base: 'full', lg: '60%' }}
               alignItems='flex-start'
            >
               {
                  img &&
                  <ProfilePhoto 
                     text='Icono'
                     current={img}
                     setProfilePhoto={setImg}
                     isRounded={false}
                  />
               }
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
                     type='text'
                     value={description}
                     onChange={handleInputChange}
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
                     options={techCategories}
                     value={categories}
                     onChange={setCategories}
                  />
               </FormControl>

               <FormControl>
                  <FormLabel fontSize='lg'>
                     Tecnologías relacionadas
                  </FormLabel>

                  {formatedTechs && (
                     <SpecialSelect
                        isMulti
                        placeholder='Seleccione las tecnologías...'
                        closeMenuOnSelect={false}
                        selectedOptionStyle='check'
                        hideSelectedOptions={
                           false
                        }
                        options={formatedTechs}
                        value={relatedTechs}
                        onChange={setRelatedTechs}
                     />
                  )}
               </FormControl>

               <Buttons
                  cancelRoute='/admin/technologies'
                  actionText='Guardar'
                  isLoading={isSaving}
               />
            </VStack>
         </form>
      </VStack>
   );
};

export default EditTech;
