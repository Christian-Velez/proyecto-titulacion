import { Button, FormControl, FormHelperText, FormLabel, Heading, Input, Select, Stack, Text, Textarea, VStack } from '@chakra-ui/react';
import { useForm } from 'hooks/useForm';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EducationDisplay from './EducationDisplay';
import ProjectDisplay from './ProjectDisplay';
import TechDisplay from './TechDisplay';
import { Select as SpecialSelect } from 'chakra-react-select';
import { startLoadingTechnologies } from 'actions/admin/technologies';
import { startLoadingSoftSkills } from 'actions/admin/softskills';
import { formatSoftskills } from 'helpers/formatSoftskills';

const EditDeveloperProfile = () => {
   // Obtener opciones DISPONIBLES (todas)
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(startLoadingTechnologies());
      dispatch(startLoadingSoftSkills());
   }, []);

   const navigate = useNavigate();
   const devInfo = useSelector(state => state.devInfo);
   
   const { softskills } = useSelector(state => state.soft);
   const [softsHere, setSoftsHere] = useState();
   useEffect(() => {
      if(softskills.length > 0){
         setSoftsHere(formatSoftskills(softskills));  
      }
   }, [softskills]);




   // Datos SELECCIONADOS
   const [
      formValues,
      handleInputChange
   ] = useForm({
      name: devInfo.name,
      location: devInfo.location,
      description: devInfo.description,
   });
   const { name, location, description } = formValues;
   const [technologies, setTechnologies] = useState(devInfo.technologies);
   const [selectedSofts, setSelectedSofts ] = useState(formatSoftskills(devInfo.softskills));
   const [projects, setProjects] = useState(devInfo.projects);
   const [education, setEducation] = useState(devInfo.education);

   
   
   const techsDisplays = technologies.map(tech => {
      const { technology, yearsOfExperience, _id } = tech;
      return <TechDisplay key={_id} technology={technology} yearsOfExperience={yearsOfExperience} id={_id}/>;
   });

   const projectsDisplays = projects.map(pr => <ProjectDisplay key={pr._id} project={pr}/>);
   const educationDisplays = education.map(ed => <EducationDisplay key={ed._id} education={ed}/>);




   const handleEditDevProfile = (e) => {
      e.preventDefault();
      console.log(name, location, description);
   };

   return (
      <VStack
         padding={{ base: 10, lg: 30, xl: 40 }}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
      >
         <Heading>
            Editando tu perfil
         </Heading>

         <form 
            style={{ width: '100%' }}
            onSubmit={ handleEditDevProfile }   
         >
            <VStack
               spacing={8}
               width={{ base: 'full', lg: '60%' }}
               alignItems='flex-start'
            >
               <FormControl>
                  <FormLabel fontSize='lg'>Foto de perfil</FormLabel>
                  <Input
                     type='file'
                     id='img'
                     accept='image/png, image/jpeg, .svg'
                  />
                  <FormHelperText> Si no adjuntas ninguna imagen, te quedarás con la anterior </FormHelperText>
               </FormControl>

               <FormControl isRequired>
                  <FormLabel fontSize='lg'>Nombre</FormLabel>
                  <Input
                     type='text'
                     name='name'
                     value={ name }
                     onChange={ handleInputChange }
                  />
               </FormControl>

               <FormControl isRequired>
                  <FormLabel fontSize='lg'>Localización</FormLabel>
                  <Input
                     type='text'
                     name='location'
                     value={ location }
                     onChange={ handleInputChange }
                  />
               </FormControl>

               <FormControl isRequired>
                  <FormLabel fontSize='lg'>Descripción</FormLabel>
                  <Textarea
                     type='text'
                     name='description'
                     value = { description }
                     onChange={ handleInputChange }
                  />
               </FormControl>

               <FormControl>
                  <FormLabel fontSize='lg'>Tecnologías</FormLabel>
                  { techsDisplays }
                  <Button
                     size='md'
                     variant='outline'
                  > Agregar </Button>
               </FormControl>

               <FormControl>
                  <FormLabel fontSize='lg'>Proyectos</FormLabel>
                  { projectsDisplays }
                  <Button
                     size='md'
                     variant='outline'
                  > Agregar </Button>
               </FormControl>

               <FormControl>
                  <FormLabel fontSize='lg'>Educación</FormLabel>
                  { educationDisplays }
                  <Button
                     size='md'
                     variant='outline'
                  > Agregar </Button>
               </FormControl>

               <FormControl>
                  <FormLabel fontSize='lg'>Licencias y certificaciones</FormLabel>
                  { educationDisplays }
                  <Button
                     size='md'
                     variant='outline'
                  > Agregar </Button>
               </FormControl>

               <FormControl>
               <FormControl>
                  <FormLabel fontSize='lg'>Mis soft skills</FormLabel>
                  {softsHere && (
                     <SpecialSelect
                        isMulti
                        name='mySoftskills'
                        placeholder='Seleccione las soft skills...'
                        closeMenuOnSelect={false}
                        selectedOptionStyle='check'
                        hideSelectedOptions={false}

                        options={softsHere}
                        value={selectedSofts}
                        onChange={setSelectedSofts}
                     />
                  )}
            </FormControl>
                  
               </FormControl>

               
               
               <Stack
                  width='full'
                  style={{ marginTop: '70px' }}
                  direction={{
                     base: 'column',
                     lg: 'row',
                  }}
               >
                  <Button
                     width='full'
                     size='lg'
                     variant='outline'
                     onClick={() =>
                        navigate(
                           '/dev/profile'
                        )
                     }
                  >
                     Cancelar
                  </Button>
                  <Button
                     width='full'
                     size='lg'
                     type='submit'
                  >
                     Guardar
                  </Button>
               </Stack>
            </VStack>
         </form>
      </VStack>
   );
};

export default EditDeveloperProfile;
