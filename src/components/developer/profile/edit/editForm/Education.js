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
import EducationDisplay from './displays/EducationDisplay';
import { useForm } from 'hooks/useForm';
import FormModal from 'components/forms/FormModal';
import BasicInput from 'components/forms/BasicInput';


const Education = ({ education, setEducation }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [error, setError] = useState('');


   const educationDisplays = education.map(ed => <EducationDisplay key={ed._id} education={ed} setEducation={setEducation}/>);


   const [ formValues, handleInputChange, resetForm] = useForm({
      title: '',
      institution: '',
      year: ''
   });
   const { title, institution, year } = formValues;


   const handleSave = () => {
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
      <FormModal label='Educación' selectedOptions={educationDisplays} onOpen={onOpen} onClose={onClose} isOpen={isOpen}>
         <ModalHeader>
         Agregar título académico
         </ModalHeader>
         <ModalCloseButton />
         <ModalBody pb={6}>
            <VStack spacing={4}>
               <BasicInput text='Título' name='title' value={title} onChange={handleInputChange} placeholder='Ingeniero en...'/>
               <BasicInput text='Institución' name='institution' value={institution} onChange={handleInputChange} placeholder='Universidad de...'/>
               <BasicInput text='Año de emisión' type='number' name='year' value={year} onChange={handleInputChange} placeholder='2021'/>
               <Text mt={4} color='red.500'> {error} </Text>
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

Education.propTypes = {
   education: PropTypes.array,
   setEducation: PropTypes.func
};

export default Education;
