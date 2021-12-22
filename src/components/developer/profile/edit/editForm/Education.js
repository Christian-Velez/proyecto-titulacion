import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import EducationDisplay from './displays/EducationDisplay';

const Education = ({ education, setEducation }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const educationDisplays = education.map(ed => <EducationDisplay key={ed._id} education={ed} setEducation={setEducation}/>);

   const handleSave = () => {
      onClose();
   };

   return (
      <FormControl>
         <FormLabel fontSize='lg'>Educación</FormLabel>
         { educationDisplays }
         <Button
            size='md'
            variant='outline'
            onClick={ onOpen }
         > Agregar </Button>


         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>
                  Agregar tecnología
               </ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  <Text> HOLA </Text>
               </ModalBody>

               <ModalFooter>
                  <Button
                     onClick={onClose}
                     variant='outline'
                  >
                     Cancelar
                  </Button>


                  <Button ml={3} onClick = { handleSave }>Guardar</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </FormControl>
   );
};

Education.propTypes = {
   education: PropTypes.array,
   setEducation: PropTypes.func
};

export default Education;
