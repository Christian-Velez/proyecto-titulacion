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
import { useDispatch } from 'react-redux';
import { startRatingDev } from 'actions/company/user';
import { toastSuccess } from 'helpers/ToastAlert';
import { Rating } from 'react-simple-star-rating';

const RateModal = ({
   isOpen,
   onClose,
   devInfo,
}) => {
   const dispatch = useDispatch();

   const [responsable, setResponsable] =
      useState(0);
   const [comprometido, setComprometido] =
      useState(0);
   const [cooperativo, setCooperativo] =
      useState(0);
   const [conflictos, setConflictos] =
      useState(0);

   const handleSubmit = (e) => {

      const body = {
         responsable: responsable / 20,
         comprometido: comprometido / 20,
         cooperativo: cooperativo / 20,
         conflictos: conflictos / 20
      }

      dispatch(
         startRatingDev(body, devInfo.id)
      ).then(() => {
         // Esto para que recargue la nueva informacion
         toastSuccess('Calificación añadida');
         onClose();
      });
   };


   const config = {
      allowHalfIcon: true,
      showTooltip: true,
      tooltipDefaultText: '0',
   };

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent ModalContent>
            <ModalHeader>
               Califica a {devInfo.name}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <VStack
                  w='full'
                  spacing={5}
                  alignItems='flex-start'
               >
                  <VStack alignItems='flex-start'>
                     <Text> Responsable</Text>
                     <Rating
                        { ...config }
                        ratingValue={
                           responsable
                        }
                        onClick={(v) =>
                           setResponsable(v)
                        }
                     />
                  </VStack>

                  <VStack alignItems='flex-start'>
                     <Text>Comprometido</Text>
                     <Rating
                        { ...config }
                        ratingValue={
                           comprometido
                        }
                        onClick={(v) =>
                           setComprometido(v)
                        }
                     />
                  </VStack>

                  <VStack alignItems='flex-start'>
                     <Text> Cooperativo</Text>
                     <Rating
                        { ...config }
                        ratingValue={
                           cooperativo
                        }
                        onClick={(v) =>
                           setCooperativo(v)
                        }
                     />
                  </VStack>

                  

                  <VStack alignItems='flex-start'>
                     <Text>Manejo de conflictos</Text>
                     <Rating
                        { ...config }
                        ratingValue={
                           conflictos
                        }
                        onClick={(v) =>
                           setConflictos(v)
                        }
                     />
                  </VStack>
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
               <Button
                  colorScheme='brandPrimaryPurple'
                  onClick={handleSubmit}
               >
                  Calificar
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
};

RateModal.propTypes = {
   isOpen: PropTypes.bool,
   onOpen: PropTypes.func,
   onClose: PropTypes.func,
   devInfo: PropTypes.object,
};

export default RateModal;
