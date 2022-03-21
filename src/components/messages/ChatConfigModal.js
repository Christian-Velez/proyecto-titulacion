import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
   VStack,
   Text,
} from '@chakra-ui/react';
import BasicInput from 'components/forms/BasicInput';
import { useForm } from 'hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startSavingDefaultMessages } from 'actions/company/user';

const ChatConfigModal = ({ isOpen, onClose }) => {
   const dispatch = useDispatch();
   const { defaultMessages = {} } = useSelector(
      (state) => state.companyInfo
   );

   const [error, setError ] = useState('');
   const [formValues, handleInputChage] = useForm(
      {
         acceptPost:
            defaultMessages.acceptPost || '',
         hireDev: defaultMessages.hireDev || '',
         fireDev: defaultMessages.fireDev || '',
      }
   );
   const { acceptPost, hireDev, fireDev } =
      formValues;

   const handleSave = () => {
      if(!acceptPost || !hireDev || !fireDev) {
         return setError('Completa todos los campos requeridos.');
      }

      setError('');
      dispatch(startSavingDefaultMessages(formValues))
         .then(() => {
               onClose();
            });
   }

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         isCentered
      >
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>
               Mensajes predeterminados
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <VStack spacing={5}>
                  <BasicInput
                     text='Al aceptar una postulación'
                     name='acceptPost'
                     placeholder='e. g: Hola, hemos aceptado tu postulación...!'
                     value={acceptPost}
                     onChange={handleInputChage}
                  />

                  <BasicInput
                     text='Al contratar a un programador'
                     name='hireDev'
                     placeholder='e. g: Hola, bienvenido a...!'
                     value={hireDev}
                     onChange={handleInputChage}
                  />

                  <BasicInput
                     text='Al despedir a un programador'
                     name='fireDev'
                     placeholder='e. g: Lo sentimos...!'
                     value={fireDev}
                     onChange={handleInputChage}
                  />

                  <Text color='red.500'> { error } </Text>
               </VStack>
            </ModalBody>

            <ModalFooter>
               <Button
                  variant='outline'
                  mr={3}
                  onClick={onClose}
               >
                  Cancelar
               </Button>
               <Button colorScheme='brandPrimaryPurple' onClick={handleSave}>
                  Guardar
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
};

ChatConfigModal.propTypes = {
   isOpen: PropTypes.bool,
   onClose: PropTypes.func,
};

export default ChatConfigModal;
