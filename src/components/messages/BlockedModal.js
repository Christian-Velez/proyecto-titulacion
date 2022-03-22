import React from 'react';
import {
   Button,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
   VStack,
   UnorderedList,
   ListItem
} from '@chakra-ui/react';

const BlockedModal = ({ isOpen, onClose }) => {
   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         isCentered
      >
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Bloqueos</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <VStack alignItems='flex-start'>
                  <Text>
                     Razones por las que se genera
                     un bloqueo:
                  </Text>
                  <UnorderedList padding={10}>
                     <ListItem>
                        El usuario programador bloquea a la empresa.
                     </ListItem>
                     <ListItem>
                        El usuario empresa descarta al programador en el paso previo a la contratación.
                     </ListItem>
                     <ListItem>
                        El usuario empresa despide al programador.
                     </ListItem>
                  </UnorderedList>
               </VStack>
            </ModalBody>

            <ModalFooter>
               <Button
                  colorScheme='blue'
                  variant='outline'
                  mr={3}
                  onClick={onClose}
               >
                  Cerrar
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
};

BlockedModal.propTypes = {};

export default BlockedModal;
