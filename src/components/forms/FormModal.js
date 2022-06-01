import React from 'react';
import PropTypes from 'prop-types';
import {
   Button,
   FormControl,
   FormLabel,
   Modal,
   ModalContent,
   ModalOverlay,
} from '@chakra-ui/react';

const FormModal = ({
   label,
   selectedOptions,
   children,
   isOpen,
   onClose,
   onOpen,
}) => {
   return (
      <>
         <FormControl>
            <FormLabel fontSize='lg'>
               {label}
            </FormLabel>
            {selectedOptions}
            <Button
               size='md'
               variant='outline'
               onClick={onOpen}
            >
               Agregar
            </Button>
         </FormControl>

         <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
               {children}
            </ModalContent>
         </Modal>
      </>
   );
};

FormModal.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   label: PropTypes.string.isRequired,
   onClose: PropTypes.func.isRequired,
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
   ]).isRequired,
   selectedOptions: PropTypes.arrayOf(
      PropTypes.element
   ).isRequired,
   onOpen: PropTypes.func.isRequired,
};

export default FormModal;
