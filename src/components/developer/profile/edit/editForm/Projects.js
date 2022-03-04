// Hooks
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'hooks/useForm';


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
import ProjectDisplay from './displays/ProjectDisplay';
import { isProjectValid } from './validations';
import BasicInput from 'components/forms/BasicInput';
import FormModal from 'components/forms/FormModal';


const Projects = ({ projects, setProjects }) => {
   const { isOpen , onOpen , onClose } = useDisclosure();
   const [error, setError] = useState('');
   
   const projectsDisplays = projects.map(pr => <ProjectDisplay key={pr._id} project={pr} setProjects={setProjects}/>);
   
   const [projectImg, setProjectImg] = useState(null);
   const [formValues, handleInputChange,resetForm] = useForm({
      name: '',
      demoLink: '',
      ghLink: ''
   });
   const { name, demoLink, ghLink } = formValues;


   const handleAdd = () => {
      const result = isProjectValid({
         ...formValues,
         projectImg
      });

      if(!result.isValid) {
         return setError(result.message);
      }
     
      const newProject = {
         title: name,
         img: projectImg,
         linkDemo: demoLink,
         linkGH: ghLink,
         _id: 'aux'+name+Math.random()
      };

      setProjects(prevProjects => ([ ...prevProjects, newProject]));
      resetForm();
      setProjectImg(null);  
      onClose();
   };

   return (
      <>
         <FormModal label='Proyectos' selectedOptions={projectsDisplays} onClose={onClose} onOpen={onOpen} isOpen={isOpen}>
            <ModalHeader>Agregar proyecto</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
               <VStack spacing={4}>
                  <BasicInput text='Imagen' type='file' id='img' accept='image/png, image/jpeg, .svg' 
                     onChange={(e) => {
                           setProjectImg(
                              e.target.files[0]
                           );
                        }} 
                  />

                  <BasicInput text='Nombre' name='name' value={name} placeholder='Mi proyecto' onChange={ handleInputChange }/>
                  <BasicInput text='Repositorio' isRequired={false} type='url' name='ghLink' value={ghLink} placeholder='https://github.com/...' onChange={ handleInputChange }/>
                  <BasicInput text='Demo, descarga' type='url' isRequired={false} name='demoLink' value={demoLink} placeholder='https://mywebsite.com/...' onChange={ handleInputChange }/>
                  <Text color='red.500'> {error} </Text>
               </VStack>
            </ModalBody>

            <ModalFooter>
               <Button onClick={onClose} variant='outline'>  Cancelar </Button>
               <Button ml={3} onClick={handleAdd}>
                  Agregar
               </Button>
            </ModalFooter>
         </FormModal>
      </>
   );
};

Projects.propTypes = {
   projects: PropTypes.array,
   setProjects: PropTypes.func
};

export default Projects;
