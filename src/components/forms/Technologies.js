import { 
   Button, 
   FormControl,
   FormLabel, 
   Heading, 
   ModalBody, 
   ModalCloseButton, 
   ModalFooter, 
   ModalHeader, 
   Select, 
   Text, 
   useDisclosure, 
   VStack
} from '@chakra-ui/react';
import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import TechDisplay from './TechDisplay';  
import { useSelector } from 'react-redux';
import { useForm } from 'hooks/useForm';
import { filterTechs } from 'helpers/filterTechs';
import FormModal from './FormModal';
import BasicInput from './BasicInput';




const Technologies = ({ technologies, setTechnologies }) => {
   const { isOpen , onOpen , onClose } = useDisclosure();
   const [error, setError ] = useState('');

   const [formValues, handleInputChange,,setFormValues ] = useForm({
      newTechnology: {},
      yearsOfExperience: ''
   });
   const { newTechnology, yearsOfExperience } = formValues;


   const { technologies: allTechs } = useSelector(state => state.tech);
   const formatedTechs = useMemo(() => filterTechs([...allTechs], technologies), [allTechs, technologies]);

   // Selecciona a la primer tecnologia en la lista
   useEffect(()=> {
      if(formatedTechs.length > 0 ) {
         setFormValues(prevForm => ({
            ...prevForm,
            newTechnology: JSON.stringify(formatedTechs[0])

         }));
      }
   }, [ formatedTechs, setFormValues ]);



   // Muestra las tecnologias seleccionadas
   const techsDisplays = technologies.map(tech => {
      const { technology, yearsOfExperience, _id } = tech;
      return <TechDisplay key={_id} technology={technology} yearsOfExperience={yearsOfExperience} id={_id} setTechnologies={setTechnologies}/>;
   });

   const handleAddNewTech = () => {
      if(yearsOfExperience === ''){
         setError('Ingresa los años de experiencia');
      }
      else if(parseInt(yearsOfExperience) > 30 || parseInt(yearsOfExperience) < 0){
         setError('Los años tienen que estar dentro del rango 0 - 30');
      }
      else{
         setError('');
         const objNewTech = JSON.parse(newTechnology);
         const techToAdd = {
            technology: objNewTech,
            yearsOfExperience: parseInt(yearsOfExperience),
            _id: 'aux'+objNewTech.name
         };

         setTechnologies(prevTechs => ([ ...prevTechs, techToAdd]));
         setFormValues({
            ...formValues,
            yearsOfExperience: ''
         });
         onClose();
      }
   };

   return (
      <>
         <FormModal label='Tecnologías' onOpen={onOpen} onClose={onClose} isOpen={isOpen} selectedOptions={techsDisplays}>
            <ModalHeader> <Heading fontSize='xl'> Agregar tecnología</Heading></ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
               <VStack spacing={4}>
                  <FormControl isRequired>
                     <FormLabel> Tecnología </FormLabel>
                     <Select
                        name='newTechnology'   
                        value={newTechnology}
                        onChange={handleInputChange}
                     >
                        { formatedTechs.map(tech => <option key={tech.id} value={JSON.stringify(tech)}> { tech.name }</option>)}
                     </Select>
                  </FormControl>
                  <BasicInput 
                     text='Años de experiencia' 
                     type='number'  
                     placeholder='(0 - 30)' 
                     min='0' max='30' 
                     name='yearsOfExperience' 
                     value={yearsOfExperience} 
                     onChange={handleInputChange}

                  />
                  <Text color='red.500'>{ error } </Text>
               </VStack>
            </ModalBody>

            <ModalFooter>
               <Button onClick={onClose} variant='outline'>  Cancelar </Button>
               <Button ml={3} onClick={ handleAddNewTech }>
                  Agregar
               </Button>
            </ModalFooter>
         </FormModal>
      </>
   );
};

Technologies.propTypes = {
   technologies: PropTypes.array,
   setTechnologies: PropTypes.func
};



export default Technologies;
