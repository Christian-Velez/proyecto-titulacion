// Hooks
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'validator';

// Componentes
import {
   Button,
   ModalBody,
   ModalCloseButton,
   ModalFooter,
   ModalHeader,
   Text,
   useDisclosure,
   VStack,
} from '@chakra-ui/react';
import CertificationDisplay from './displays/CertificationDisplay';
import { useForm } from 'hooks/useForm';
import FormModal from 'components/forms/FormModal';
import BasicInput from 'components/forms/BasicInput';

const Certifications = ({ certifications, setCertifications }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [error, setError] = useState('');
   
   
   const certificationDisplays = certifications.map(cer => <CertificationDisplay key={cer._id} certification={cer} setCertifications={setCertifications}/>);
   
   
   
   const [certImg, setCertImg] = useState(null);
   const [ formValues, handleInputChange, resetForm] = useForm({
      title: '',
      institution: '',
      year: ''
   });
   const { title, institution, year } = formValues;


   const handleSave = () => {
      if(!certImg) {
         return setError('Adjunta una imagen');
      }
      if(isEmpty(title) || title.length < 5){
         return setError('Ingresa un título válido');
      }
      if(isEmpty(institution)){
         return setError('Ingresa una institución válida');
      }
      if(isEmpty(year) || parseInt(year) < 1950 || parseInt(year) > 2022) {
         return setError('Ingresa un año de emisión válido (1950 - 2022)');
      }
      setError('');

      const newCert = {
         img: certImg,
         institution,
         title,
         year,
         _id: 'aux'+title+Math.random()
      };
      setCertifications(prevCer => ([ ...prevCer, newCert]));
      onClose();
      resetForm();
   };

   return (
      
      <FormModal 
         label='Licencias y certificaciones' 
         selectedOptions={certificationDisplays} 
         onOpen={onOpen} 
         isOpen={isOpen} 
         onClose={onClose} 
      >
               <ModalHeader>
                  Agregar licencia / certificación
               </ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  <VStack spacing={4}>
                     <BasicInput text='Imagen' type='file' id='img' accept='image/png, image/jpeg, .svg' 
                        onChange={(e) => {
                              setCertImg(
                                 e.target.files[0]
                              );
                           }} 
                     />

                     <BasicInput text='Título' name='title' value={title} onChange={handleInputChange} placeholder='Curso React.js' />
                     <BasicInput text='Institución' name='institution' value={institution} onChange={handleInputChange} placeholder='Udemy' />
                     <BasicInput text='Año de emisión' name='year' value={year} onChange={handleInputChange} placeholder='2021' min={1950} max={2022}/>
                     <Text color='red.500'> {error} </Text>
                  </VStack>
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
      </FormModal>
   );
};

Certifications.propTypes = {
   certifications: PropTypes.array,
   setCertifications: PropTypes.func
};

export default Certifications;
