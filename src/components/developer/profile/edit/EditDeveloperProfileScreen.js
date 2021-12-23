// Hooks
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'hooks/useForm';


// Info
import { startLoadingTechnologies } from 'actions/admin/technologies';
import { startLoadingSoftSkills } from 'actions/admin/softskills';
import { formatSoftskills } from 'helpers/formatSoftskills';


// Componentes
import ProfilePhoto from './editForm/ProfilePhoto';
import BasicInput from './editForm/BasicInput';
import Technologies from './editForm/Technologies';
import Projects from './editForm/Projects';
import Education from './editForm/Education';
import Certifications from './editForm/Certifications';
import Buttons from './editForm/Buttons';

import { 
   FormControl, 
   FormLabel, 
   Heading, 
   Text, 
   Textarea, 
   VStack 
} from '@chakra-ui/react';
import { Select as SpecialSelect } from 'chakra-react-select';

const EditDeveloperProfile = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);


   // Obtener opciones DISPONIBLES (todas)
   const dispatch = useDispatch();
   const { softskills } = useSelector(state => state.soft);   
   useEffect(() => {
      dispatch(startLoadingTechnologies());
      
      // Hacer esto pero con las tecnologias
      // debido a que si el usuario tiene ya las tecnologias por haber entrado
      // a /dev/technologies, no es necesario volverlas a cargar y hacer la peticion
      if(softskills.length === 0) {
         dispatch(startLoadingSoftSkills());
      }      
   }, []);

   const devInfo = useSelector(state => state.devInfo);
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
   const [certifications, setCertifications] = useState(devInfo.certifications);
   const [profilePhoto, setProfilePhoto] = useState(devInfo.img);


   // Actualizar perfil
   const handleEditDevProfile = (e) => {
      e.preventDefault();
   
      console.log({
         profilePhoto,
         name,
         location,
         description,
         technologies,
         projects,
         education,
         certifications,
         selectedSofts
      });

   };



   return (
      <VStack
         padding={{ base: 10, lg: 30, xl: 40 }}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
      >  
         <VStack alignItems='flex-start'>
            <Heading> Editando tu perfil </Heading>
            <Text fontStyle='italic'>No olvides guardar tus cambios</Text> 
         </VStack>

         <form 
            style={{ width: '100%' }}
            onSubmit={ handleEditDevProfile }   
         >
            <VStack
               spacing={8}
               width={{ base: 'full', lg: '60%' }}
               alignItems='flex-start'
            >
               <ProfilePhoto setProfilePhoto={setProfilePhoto}/>

               <BasicInput text='Nombre' name='name' value={name} onChange={ handleInputChange } />
               <BasicInput text='Localizacion' name='location' value={location} onChange={ handleInputChange } />
               
               <FormControl isRequired>
                  <FormLabel fontSize='lg'>Descripción</FormLabel>
                  <Textarea type='text' name='description' value = { description } onChange={ handleInputChange } maxLength={10} />
               </FormControl>


               <Technologies technologies={technologies} setTechnologies={setTechnologies}/>
               <Projects projects={projects} setProjects={setProjects} />
               <Education education={education} setEducation={setEducation}/>
               <Certifications certifications={certifications} setCertifications={setCertifications}/>

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
               <Buttons />
            </VStack>
         </form>
      </VStack>
   );
};

export default EditDeveloperProfile;
