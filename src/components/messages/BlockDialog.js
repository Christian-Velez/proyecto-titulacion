import React from 'react';
import PropTypes from 'prop-types';
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   Text,
   ModalFooter,
   ModalBody,
   Button,
   ModalCloseButton,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { startBlockingCompany } from 'actions/developer/user';

const BlockDialog = ({
   isOpen,
   onClose,
   user,
}) => {
   const dispatch = useDispatch();
   const handleBlock = () => {
      dispatch(startBlockingCompany(user));
      onClose();
   };

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         isCentered
      >
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Bloquear</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <Text fontSize='lg'>
                  ¿Estas seguro de que quieres
                  bloquear a la empresa{' '}
                  <span
                     style={{ color: '#38B2AC' }}
                  >
                     {user.name}
                  </span>
                  ?
               </Text>

               <Text fontSize='lg' marginY={5}>
                  Hacerlo ocasionará que te
                  elimines de su lista de
                  candidatos/contratados y que el chat quede
                  inhabilitado.
               </Text>
            </ModalBody>
            <ModalFooter>
               <Button
                  variant='ghost'
                  mr={3}
                  onClick={onClose}
               >
                  Cancelar
               </Button>
               <Button
                  colorScheme='red'
                  onClick={handleBlock}
               >
                  Bloquear
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
};

BlockDialog.propTypes = {
   isOpen: PropTypes.bool,
   onClose: PropTypes.func,
   user: PropTypes.object,
};

export default BlockDialog;
