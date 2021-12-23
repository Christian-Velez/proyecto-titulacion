// Hooks
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'hooks/useForm';
import { isURL, isEmpty } from 'validator';


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
import ProjectDisplay from './displays/ProjectDisplay';


const Projects = ({ projects, setProjects }) => {
   const { isOpen , onOpen , onClose } = useDisclosure();
   const [imgError, setImgError ] = useState('');
   const [nameError, setNameError] = useState('');
   const [ghError, setGhError] = useState('');
   const [demoError, setDemoError] = useState('');
   
   const projectsDisplays = projects.map(pr => <ProjectDisplay key={pr._id} project={pr} setProjects={setProjects}/>);
   const [projectImg, setProjectImg] = useState(null);
   const [formValues, handleInputChange,resetForm] = useForm({
      name: '',
      demoLink: '',
      ghLink: ''
   });
   const { name, demoLink, ghLink } = formValues;


   const handleAdd = () => {     
      if(!projectImg) {
         return setImgError('Adjunta una imagen');
      }
      else{
         setImgError('');
      }
      if(isEmpty(name)) {
         return setNameError('Ingresa un nombre');
      }
      else {
         setNameError('');
      }
   
      if(isEmpty(ghLink)){
         return setGhError('Ingresa el link del repositorio');
      }
      else if(!isURL(ghLink)){
         return setGhError('El texto ingresado no es un link');
      }
      else {
         setGhError('');
      }
      
      if(!isEmpty(demoLink)) {
         if(!isURL(demoLink)){
            return setDemoError('El texto ingresado no es un link');
         }
         else {
            setDemoError('');
         }
      }

      // Si pasa todos los filtros
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
                  { imgError && <FormHelperText color='red.500'> {imgError} </FormHelperText> }
               </FormControl>

               <FormControl mt={4} isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                     type='text'
                     name='name'
                     value={ name }
                     placeholder='Mi proyecto'
                     onChange={ handleInputChange }
                  />
                  { nameError && <FormHelperText color='red.500'> {nameError} </FormHelperText> }
               </FormControl>

               <FormControl mt={4} isRequired>
                  <FormLabel>Repositorio de Github</FormLabel>
                  <Input
                     type='url'
                     name='ghLink'
                     value={ ghLink }
                     onChange={ handleInputChange }
                     placeholder='https://github.com/...'
                  />
                  { ghError && <FormHelperText color='red.500'> {ghError} </FormHelperText> }

               </FormControl>

               <FormControl mt={4}>
                  <FormLabel>Demo</FormLabel>
                  <Input
                     type='url'
                     name='demoLink'
                     value={ demoLink }
                     onChange={ handleInputChange }
                     placeholder='https://mywebsite.com/...'
                  />
                  { demoError && <FormHelperText color='red.500'> {demoError} </FormHelperText> }

               </FormControl>
            </ModalBody>

          <ModalFooter>
            
            <Button onClick={onClose} variant='outline'>  Cancelar </Button>

            <Button colorScheme='blue' ml={3} onClick={handleAdd}>
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
