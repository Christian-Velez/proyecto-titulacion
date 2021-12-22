import { Button, FormControl, FormLabel, Text, useDisclosure } from '@chakra-ui/react';
import InputModal from 'components/developer/InputModal';
import React from 'react';
import PropTypes from 'prop-types';
import TechDisplay from './displays/TechDisplay';



const Technologies = ({ technologies, setTechnologies }) => {
   const { isOpen: isOpenTech, onOpen: onOpenTech, onClose: onCloseTech } = useDisclosure();

   // Info mostrada en las secciones
   const techsDisplays = technologies.map(tech => {
      const { technology, yearsOfExperience, _id } = tech;
      return <TechDisplay key={_id} technology={technology} yearsOfExperience={yearsOfExperience} id={_id} setTechnologies={setTechnologies}/>;
   });



   return (
      
      <FormControl>
      <FormLabel fontSize='lg'>Tecnologías</FormLabel>
      { techsDisplays }

      <InputModal text='Agregar tecnología' isOpen={isOpenTech} onClose={onCloseTech} >
         <Text>SIO </Text>
      </InputModal>

      <Button size='md' variant='outline' onClick={onOpenTech}
      > Agregar </Button>
   </FormControl>
   );
};




Technologies.propTypes = {
   technologies: PropTypes.array,
   setTechnologies: PropTypes.func
};



export default Technologies;
