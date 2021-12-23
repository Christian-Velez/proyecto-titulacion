// Hooks
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'validator';

// Componentes
import {
   Button,
   FormControl,
   FormHelperText,
   FormLabel,
   Input,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
} from '@chakra-ui/react';
import CertificationDisplay from './displays/CertificationDisplay';
import { useForm } from 'hooks/useForm';




const Certifications = ({ certifications, setCertifications }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const [imgError, setImgError ] = useState('');
   const [titleError, setTitleError ] = useState('');
   const [instError, setInstError ] = useState('');
   const [yearError, setYearError ] = useState('');

   const [certImg, setCertImg] = useState(null);



   const certificationDisplays = certifications.map(cer => <CertificationDisplay key={cer._id} certification={cer} setCertifications={setCertifications}/>);
   

   const [ formValues, handleInputChange, resetForm] = useForm({
      title: '',
      institution: '',
      year: ''
   });
   const { title, institution, year } = formValues;


   const handleSave = () => {
      if(!certImg) {
         return setImgError('Adjunta una imagen');
      }
      else{
         setImgError('');
      }
      if(isEmpty(title) || title.length < 5){
         return setTitleError('Ingresa un título válido');
      }
      else{
         setTitleError('');
      }

      if(isEmpty(institution)){
         return setInstError('Ingresa una institución válida');
      }
      else{
         setInstError('');
      }

      if(isEmpty(year) || parseInt(year) < 1950 || parseInt(year) > 2022) {
         return setYearError('Ingresa un año de emisión válido (1950 - 2022)');
      }
      else {
         setYearError('');
      }

      // Si pasa los filtros
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
      
      <FormControl>
      <FormLabel fontSize='lg'>Licencias y certificaciones</FormLabel>
      { certificationDisplays }
      <Button
         size='md'
         variant='outline'
         onClick={ onOpen }
      > Agregar </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>
            Agregar licencia / certificación
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
               <FormControl isRequired>
                  <FormLabel> Imagen </FormLabel>
                  <Input
                     type='file'
                     id='img'
                     accept='image/png, image/jpeg, .svg'
                     onChange={(e) => {
                        setCertImg(
                           e.target.files[0]
                        );
                     }}
                  />
                  { imgError && <FormHelperText color='red.500'> {imgError} </FormHelperText> }
               </FormControl>

               <FormControl mt={4} isRequired>
                  <FormLabel>Título</FormLabel>
                  <Input
                     type='text'
                     name='title'
                     value={ title }
                     onChange={ handleInputChange }
                     placeholder='Curso React Native'
                  />
                  { titleError && <FormHelperText color='red.500'> {titleError} </FormHelperText> }
               </FormControl>

               <FormControl mt={4} isRequired>
                  <FormLabel>Institución</FormLabel>
                  <Input
                     type='text'
                     name='institution'
                     value={ institution }
                     onChange={ handleInputChange }
                     placeholder='Udemy'
                  />
                  { instError && <FormHelperText color='red.500'> {instError} </FormHelperText> }
               </FormControl>

               <FormControl mt={4} isRequired>
                  <FormLabel>Año de emisión</FormLabel>
                  <Input
                     type='number'
                     name='year'
                     value={ year }
                     onChange={ handleInputChange } 
                     placeholder='2021'
                     min={1950}
                     max={2022}
                  />
                  { yearError && <FormHelperText color='red.500'> {yearError} </FormHelperText> }
               </FormControl>
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

Certifications.propTypes = {
   certifications: PropTypes.array,
   setCertifications: PropTypes.func
};

export default Certifications;
