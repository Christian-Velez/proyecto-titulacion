// Hooks
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'hooks/useForm';


// Componentes
import {
   Button,
   FormControl,
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
   VStack,
} from '@chakra-ui/react';
import ProjectDisplay from './displays/ProjectDisplay';
import { isProjectValid } from './validations';
import BasicInput from 'components/forms/BasicInput';


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
      onClose();
      resetForm();
      setProjectImg(null);  
   };

   return (
      <>
         <FormControl>
            <FormLabel fontSize='lg'>Proyectos</FormLabel>
            { projectsDisplays }
            <Button
               size='md'
               variant='outline'
               onClick={ onOpen }
            > Agregar </Button>
         </FormControl>
         <Modal
            isOpen={isOpen}
            onClose={onClose}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Agregar proyecto</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  <VStack spacing={4}>
                     <FormControl isRequired>
                        <FormLabel> Imagen </FormLabel>
                        <Input
                           type='file'
                           id='img'
                           accept='image/png, image/jpeg, .svg'
                           onChange={(e) => {
                              setProjectImg(
                                 e.target.files[0]
                              );
                           }}
                        />
                     </FormControl>

                     <BasicInput text='Nombre' name='name' value={name} placeholder='Mi proyecto' onChange={ handleInputChange }/>
                     <BasicInput text='Repositorio' type='url' name='ghLink' value={ghLink} placeholder='https://github.com/...' onChange={ handleInputChange }/>
                     <BasicInput text='Demo' type='url' name='demoLink' value={demoLink} placeholder='https://mywebsite.com/...' onChange={ handleInputChange }/>
                     
                     <FormLabel mt={4} color='red.500'> {error} </FormLabel>
                  </VStack>
               </ModalBody>

               <ModalFooter>
                  <Button onClick={onClose} variant='outline'>  Cancelar </Button>
                  <Button ml={3} onClick={handleAdd}>
                     Agregar
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>

      </>
   );
};

Projects.propTypes = {
   projects: PropTypes.array,
   setProjects: PropTypes.func
};

export default Projects;
