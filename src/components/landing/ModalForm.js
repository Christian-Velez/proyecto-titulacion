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
   children,
   ...rest
}) => {
   return (
      <Modal
         isCentered
         size='xl'
         
         
         { ...rest }
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
