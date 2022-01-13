import React from 'react';
import PropTypes from 'prop-types';
import {
   Heading,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
} from '@chakra-ui/react';

const ModalForm = ({
   title,
   isOpen,
   onClose,
   children,
}) => {
   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         isCentered
         scrollBehavior='inside'
         size='xl'
      >
         <ModalOverlay />
         <ModalContent padding={10}>
            <ModalHeader>
               <Heading fontSize='xl'>
                  {title}
               </Heading>
            </ModalHeader>

            <ModalCloseButton />
            <ModalBody>{children}</ModalBody>
         </ModalContent>
      </Modal>
   );
};

ModalForm.propTypes = {
   title: PropTypes.string,
   isOpen: PropTypes.bool,
   onClose: PropTypes.func,
   children: PropTypes.element,
};

export default ModalForm;
