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
   Select, 
   useDisclosure 
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TechDisplay from './TechDisplay';  
import { useSelector } from 'react-redux';
import { useForm } from 'hooks/useForm';



const Technologies = ({ technologies, setTechnologies }) => {
   const { isOpen , onOpen , onClose } = useDisclosure();
   const [error, setError ] = useState({
      error: false,
      message: ''
   });


   // Nueva tecnologia por agregar
     const [formValues, handleInputChange,,setFormValues ] = useForm({
      newTechnology: {},
      yearsOfExperience: ''
   });
   const { newTechnology, yearsOfExperience } = formValues;


   // Todas las tecnologias (usadas en el select del Modal)
   const { technologies: allTechs } = useSelector(state => state.tech);
   const [formatedTechs, setFormatedTechs ] = useState([]); // Ordenadas alfabeticamente y sin las seleccionadas

   useEffect(() => {
      // Alfabeticamente
      
      // Spread operator para que no afecte el orden de la REDUX STORE
      let aux = [... allTechs];
      aux.sort((a, b) => a.name.localeCompare(b.name));


      // Le quita las tecnologias que el usuario ya selecciono
      // para que no pueda agregar dos veces la misma
      aux = aux.filter(({ name: name1 }) => !technologies.some(({ technology }) => name1 === technology.name));

      setFormatedTechs(aux);
   }, [technologies]);

   useEffect(()=> {
      // Selecciona a la primer tecnologia en la lista
      if(formatedTechs.length > 0 ) {
         setFormValues({
            ...formValues,
            newTechnology: JSON.stringify(formatedTechs[0])
         });
      }
   }, [formatedTechs, technologies]);



   // Muestra las tecnologias seleccionadas
   const techsDisplays = technologies.map(tech => {
      const { technology, yearsOfExperience, _id } = tech;
      return <TechDisplay key={_id} technology={technology} yearsOfExperience={yearsOfExperience} id={_id} setTechnologies={setTechnologies}/>;
   });


   // Agregar una nueva tecnologia
   // Incluye las validaciones
   const handleAdd = () => {
      if(yearsOfExperience === ''){
         setError({ error: true, message: 'Ingresa los años de experiencia'});
      }
      else if(parseInt(yearsOfExperience) > 30 || parseInt(yearsOfExperience) < 0){
         setError({ error: true, message: 'Los años tienen que estar dentro del rango 0 - 30'});
      }
      else{
         setError(false);
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
          <ModalHeader>Agregar tecnología</ModalHeader>
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

                  {
                     error.error && <FormHelperText color='red.500'>{ error.message } </FormHelperText>
                  }
               </FormControl>

          </ModalBody>

          <ModalFooter>
            
            <Button onClick={onClose} variant='outline'>  Cancelar </Button>

            <Button colorScheme='blue' ml={3} onClick={ handleAdd }>
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