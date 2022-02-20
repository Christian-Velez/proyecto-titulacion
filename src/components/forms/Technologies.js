import { 
   Button, 
   FormControl,
   FormHelperText, 
   FormLabel, 
   Heading, 
   Input, 
   Modal, 
   ModalBody, 
   ModalCloseButton, 
   ModalContent, 
   ModalFooter, 
   ModalHeader, 
   ModalOverlay, 
   Select, 
   useDisclosure 
} from '@chakra-ui/react';
import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import TechDisplay from './TechDisplay';  
import { useSelector } from 'react-redux';
import { useForm } from 'hooks/useForm';
import { filterTechs } from 'helpers/filterTechs';




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
         <FormControl>
            <FormLabel fontSize='lg'>Tecnologías</FormLabel>
            { techsDisplays }
            <Button size='md' variant='outline' onClick={onOpen}
            > Agregar </Button>
         </FormControl>

         <Modal
            isOpen={isOpen}
            onClose={onClose}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader> <Heading fontSize='xl'> Agregar tecnología</Heading></ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>


                  <FormControl>
                     <FormLabel> Tecnología </FormLabel>

                     <Select
                        name='newTechnology'   
                        value={newTechnology}
                        onChange={handleInputChange}
                     >
                        { formatedTechs.map(tech => <option key={tech.id} value={JSON.stringify(tech)}> { tech.name }</option>)}
                     </Select>

                  </FormControl>

                  <FormControl mt={4} isRequired>
                     <FormLabel>Años de experiencia </FormLabel>
                     <Input 
                        type='number' 
                        placeholder='(0 - 30)' 
                        min='0' max='30' 
                        name='yearsOfExperience' 
                        value={yearsOfExperience} 
                        onChange={handleInputChange}/>
                     <FormHelperText color='red.500'>{ error} </FormHelperText>
                  </FormControl>

               </ModalBody>

               <ModalFooter>
            
                  <Button onClick={onClose} variant='outline'>  Cancelar </Button>

                  <Button ml={3} onClick={ handleAddNewTech }>
                     Agregar
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

Technologies.propTypes = {
   technologies: PropTypes.array,
   setTechnologies: PropTypes.func
};



export default Technologies;
