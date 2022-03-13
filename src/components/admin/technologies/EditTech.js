// Hooks
import React, {
   useEffect,
} from 'react';
import {
   useDispatch,
   useSelector,
} from 'react-redux';
import {
   Navigate,
   useNavigate,
   useParams,
} from 'react-router-dom';

// Componentes
import BasicInput from 'components/forms/BasicInput';
import ProfilePhoto from 'components/layout/ProfilePhoto';
import Buttons from 'components/forms/Buttons';
import { Select as SpecialSelect } from 'chakra-react-select';
import {
   Button,
   FormControl,
   FormLabel,
   Heading,
   HStack,
   Select,
   Text,
   Textarea,
   useDisclosure,
   VStack,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
} from '@chakra-ui/react';

// Datos
import {
   typesOfTech,
   techCategories,
} from 'helpers/appCategories';
import { transformTechnologiesFormat } from 'helpers/admin/transformTechnologiesFormat';
import { startDeletingTechnology, startUpdatingTech } from 'actions/admin/technologies';
import { isTechnologyFormValid } from 'helpers/admin/isFormValid';
import { errorAlert } from 'helpers/SwalAlerts';
import { startLoading } from 'actions/ui';
import { formatTechnologyToDB } from 'helpers/admin/formatTechnologyToDB';
import { useState } from 'react';
import { useForm } from 'hooks/useForm';
import Layout from 'components/layout';
import useScrollToTop from 'hooks/useScrollToTop';

const EditTech = () => {
   useScrollToTop();
   // Herramientas
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { isOpen, onOpen, onClose } = useDisclosure();
   
   // Seleccionar tecnologia
   const { id } = useParams();
   const { technologies: allTechs } = useSelector(state => state.tech);
   const technology = allTechs.find((tech) => tech.id === id);
   const formatedTechs = transformTechnologiesFormat(allTechs);

   // Valores del formulario
   const [ img, setImg ] = useState(technology?.img);
   const [ categories, setCategories ] = useState([]);
   const [ relatedTechs, setRelatedTechs ] = useState([]);
   const [ formValues, handleInputChange ] = useForm({
      name: technology?.name,
      description: technology?.description,
      type: technology?.type
   });
   const { name, description, type } = formValues;

 
   // Formatear las tecnologias seleccionadas iniciales
   useEffect(() => {
      const relatedTechsFormated = transformTechnologiesFormat(technology.relatedTechs);
      const categoriesFormated =
         technology.categories.map((cat) => {
            return {
               value: cat,
               label: cat,
            };
         });

      setRelatedTechs(relatedTechsFormated);
      setCategories(categoriesFormated);
   }, [ technology ]);

   
   const handleEditTech = async (e) => {
      e.preventDefault();

      const techInfo = { id, name, description, img, type, categories, relatedTechs };

      if(!isTechnologyFormValid(techInfo)) {
         return errorAlert({ message: 'Rellene todos los campos solicitados'});
      }

      dispatch(startLoading());
      const techToDB = await formatTechnologyToDB(techInfo);
      dispatch(startUpdatingTech( techToDB, navigate));
   };

   const handleDeleteTechnology = (e) => {
      e.preventDefault();
      onClose();
      dispatch(startDeletingTechnology(technology.id, navigate));
   };

   if(!technology) {
      return <Navigate to='/admin/technologies' />;
   }
   return (
      <>
         <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Eliminar tecnología</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Text>¿Estas seguro de que quieres eliminar { technology.name}?.</Text>
                  <Text mt={3}>Ten en cuenta que algunos usuarios podrían tener la tecnología añadida en su stack.</Text>
               </ModalBody>

               <ModalFooter>
                  <Button colorScheme='brandPrimaryPurple' onClick={onClose}>Cancelar</Button>
                  <Button  variant='outline' ml={3} onClick={handleDeleteTechnology}>
                     Eliminar
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>

         <Layout>
            <HStack spacing={5}>
               <Heading>
                  Editando { technology.name }
               </Heading>

               <Button colorScheme='brandPrimaryPurple' onClick={onOpen}>Eliminar</Button>
            </HStack>

            <form
               style={{ width: '100%' }}
               onSubmit={handleEditTech}
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
                  />

                  <BasicInput text='Nombre' name='name' value={name} onChange={handleInputChange}/>

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

                     <SpecialSelect
                        isMulti
                        placeholder='Seleccione las tecnologías...'
                        closeMenuOnSelect={false}
                        selectedOptionStyle='check'
                        hideSelectedOptions={false}
                        options={formatedTechs}
                        value={relatedTechs}
                        onChange={setRelatedTechs}
                     />
                  </FormControl>

                  <Buttons
                     cancelRoute='/admin/technologies'
                     actionText='Guardar'
                  />
               </VStack>
            </form>
         </Layout>
      </>

   );
};

export default EditTech;
