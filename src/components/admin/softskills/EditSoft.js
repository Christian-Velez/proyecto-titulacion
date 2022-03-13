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

// Info
import { startDeletingSoft, startUpdatingSoft } from 'actions/admin/softskills';

// Componentes
import Buttons from 'components/forms/Buttons';
import ProfilePhoto from 'components/layout/ProfilePhoto';
import {
   Button,
   Heading,
   HStack,
   VStack,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   useDisclosure,
   Text,
} from '@chakra-ui/react';
import Layout from 'components/layout';
import BasicInput from 'components/forms/BasicInput';

const EditSoft = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { isOpen, onOpen, onClose } = useDisclosure();


   // Todas las soft skills guardadas en el store
   const { softskills } = useSelector(
      (state) => state.soft
   );
   const softskill = softskills.find(
      (soft) => soft.id === id
   );

   // Form Values
   const [name, setName] = useState('');
   const [img, setImg] = useState(null);

   useEffect(() => {
      // Establece los valores guardados
      if (softskill) {
         setName(softskill.name);
         setImg(softskill.img);
      }
   }, [softskill]);

   const handleEditSoft = async (e) => {
      e.preventDefault();
      dispatch(
         startUpdatingSoft(
            { id, name, img },
            navigate
         )
      );
   };
   
   const handleDeleteSoft = (e) => {
      e.preventDefault();
      dispatch(startDeletingSoft(softskill?.id, navigate));
   };


   return (
      <>
         <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Eliminar softskill</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Text>¿Estas seguro de que quieres eliminar {softskill.name}?</Text>
                  <Text mt={3}>Ten en cuenta que algunos usuarios podrían tener la softskill añadida en su stack.</Text>
               </ModalBody>

               <ModalFooter>
                  <Button colorScheme='brandPrimaryPurple' onClick={onClose}>Cancelar</Button>
                  <Button  variant='outline' ml={3} onClick={handleDeleteSoft}>
                     Eliminar
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>

         <Layout>
            <HStack spacing={5}>
               <Heading>
                  Editando {softskill && softskill.name}
               </Heading>
               
               <Button onClick={onOpen} colorScheme='brandPrimaryPurple'>Eliminar</Button>
            </HStack>

            <form
               style={{ width: '100%' }}
               onSubmit={handleEditSoft}
            >
               <VStack
                  spacing={8}
                  width={{ base: 'full', lg: '60%' }}
                  alignItems='flex-start'
               >
                  {img && (
                     <ProfilePhoto
                        current={img}
                        setProfilePhoto={setImg}
                        text='Icono'
                        isRounded={false}
                     />
                  )}
                  <BasicInput
                     text='Nombre'
                     name='name'
                     value={name}
                     onChange={(e) => {
                        setName(e.target.value);
                     }}
                  />
                  <Buttons
                     actionText='Guardar'
                     cancelRoute='/admin/soft-skills'
                  />
               </VStack>
            </form>
         </Layout>
      </>

   );
};

export default EditSoft;
