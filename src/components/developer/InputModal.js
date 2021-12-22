import PropTypes from 'prop-types';

import {
   Button,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';

const InputModal = ({ text, isOpen, onClose, children, handleSave }) => {
   return (
      <>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>
                  { text }
               </ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  { children }
               </ModalBody>

               <ModalFooter>
                  <Button
                     onClick={onClose}
                     variant='outline'
                  >
                     Cancelar
                  </Button>


                  <Button ml={3} onClick={ handleSave }>Guardar</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

InputModal.propTypes = {
   text: PropTypes.string,
   isOpen: PropTypes.bool,
   onClose: PropTypes.func,
   children: PropTypes.element,
   handleSave: PropTypes.func
};

export default InputModal;
