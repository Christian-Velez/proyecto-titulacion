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
import EducationDisplay from './displays/EducationDisplay';
import { useForm } from 'hooks/useForm';


const Education = ({ education, setEducation }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [titleError, setTitleError ] = useState('');
   const [instError, setInstError ] = useState('');
   const [yearError, setYearError ] = useState('');


   const educationDisplays = education.map(ed => <EducationDisplay key={ed._id} education={ed} setEducation={setEducation}/>);

   const [ formValues, handleInputChange, resetForm] = useForm({
      title: '',
      institution: '',
      year: ''
   });
   const { title, institution, year } = formValues;


   const handleSave = () => {
      
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
      const newEd = {
         institution,
         title,
         year,
         _id: 'aux'+title+Math.random()
      };
      setEducation(prevEd => ([ ...prevEd, newEd]));
      onClose();
      resetForm();
   };

   return (
      <FormControl>
         <FormLabel fontSize='lg'>Educación</FormLabel>
         { educationDisplays }
         <Button
            size='md'
            variant='outline'
            onClick={ onOpen }
         > Agregar </Button>


         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>
               Agregar título académico
               </ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  <FormControl mt={4} isRequired>
                     <FormLabel>Título</FormLabel>
                     <Input
                        type='text'
                        name='title'
                        value={ title }
                        onChange={ handleInputChange }
                        placeholder='Ingeniero en...'
                     />
                     { titleError && <FormHelperText color='red.500'> {titleError} </FormHelperText> }


                  </FormControl>

                  <FormControl mt={4} isRequired>
                     <FormLabel>Institución</FormLabel>
                     <Input
                        type='text'
                        name='institution'
                        value={ institution }
                        onChange={ handleInputChange} 
                        placeholder='Universidad de...'
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

Education.propTypes = {
   education: PropTypes.array,
   setEducation: PropTypes.func
};

export default Education;
