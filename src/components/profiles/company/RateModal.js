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
 } from '@chakra-ui/react'
import { Rating } from 'react-simple-star-rating';
import { useDispatch } from 'react-redux';
import { startRatingCompany } from 'actions/developer/user';
import { toastSuccess } from 'helpers/ToastAlert';

const RateModal = ({ isOpen, onClose, companyInfo }) => {
   const dispatch = useDispatch();
   const [salario, setSalario] =
      useState(0);
   const [ambiente, setAmbiente] =
      useState(0);
   const [prestaciones, setPrestaciones] =
      useState(0);
   const [proceso, setProceso] =
      useState(0);

   const handleSubmit = () => {
      const body = {
         salario: salario / 20,
         ambiente: ambiente / 20,
         prestaciones: prestaciones / 20,
         proceso: proceso / 20
      };

      dispatch(startRatingCompany(body, companyInfo.id))
         .then(() => {
            toastSuccess('Calificación añadida');
            onClose();
         })
   }

   const config = {
      allowHalfIcon: true,
      showTooltip: true,
      tooltipDefaultText: '0',
   };

   return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Califica a {companyInfo.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <VStack
                  w='full'
                  spacing={5}
                  alignItems='flex-start'
               >
                  <VStack alignItems='flex-start'>
                     <Text>Salario competitivo</Text>
                     <Rating
                        { ...config }
                        ratingValue={
                           salario
                        }
                        onClick={(v) =>
                           setSalario(v)
                        }
                     />
                  </VStack>

                  <VStack alignItems='flex-start'>
                     <Text>Ambiente laboral</Text>
                     <Rating
                        { ...config }
                        ratingValue={
                           ambiente
                        }
                        onClick={(v) =>
                           setAmbiente(v)
                        }
                     />
                  </VStack>

                  <VStack alignItems='flex-start'>
                     <Text>Prestaciones</Text>
                     <Rating
                        { ...config }
                        ratingValue={
                           prestaciones
                        }
                        onClick={(v) =>
                           setPrestaciones(v)
                        }
                     />
                  </VStack>

                  

                  <VStack alignItems='flex-start'>
                     <Text>Proceso de contratación</Text>
                     <Rating
                        { ...config }
                        ratingValue={
                           proceso
                        }
                        onClick={(v) =>
                           setProceso(v)
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
   onClose: PropTypes.func,
   companyInfo: PropTypes.object
};

export default RateModal;
