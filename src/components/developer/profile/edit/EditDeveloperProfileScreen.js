// Hooks
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'hooks/useForm';


// Info
import { formatSoftskills } from 'helpers/formatSoftskills';
import { startUpdatingDevInfo } from 'actions/developer/user';
import { isEmpty } from 'validator';

// Componentes
import ProfilePhoto from 'components/ProfilePhoto';
import BasicInput from 'components/BasicInput';
import Buttons from 'components/Buttons';

import Technologies from './editForm/Technologies';
import Projects from './editForm/Projects';
import Education from './editForm/Education';
import Certifications from './editForm/Certifications';

import { 
   FormControl, 
   FormLabel, 
   Heading, 
   Text, 
   Textarea, 
   VStack 
} from '@chakra-ui/react';
import { Select as SpecialSelect } from 'chakra-react-select';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const EditDeveloperProfile = () => {
   const navigate = useNavigate();
   const [isUpdating, setIsUpdating] = useState(false);


   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);


   // Obtener opciones DISPONIBLES (todas)
   const dispatch = useDispatch();
   const { softskills } = useSelector(state => state.soft);   


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

      if(isEmpty(name) || isEmpty(location) || isEmpty(description)){
         return Swal.fire({
            icon: 'warning',
            title: 'Error...',
            text: 'Completa todos los campos requeridos para actualizar tu perfil',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });
      }
      dispatch(startUpdatingDevInfo({
         profilePhoto,
         name,
         location,
         description,
         technologies,
         projects,
         education,
         certifications,
         selectedSofts
      }, navigate, setIsUpdating));
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
               <ProfilePhoto setProfilePhoto={setProfilePhoto} current={profilePhoto} text='Foto de perfil'/>

               <BasicInput text='Nombre' name='name' value={name} maxLength={50} onChange={ handleInputChange } />
               <BasicInput text='Localización' name='location' value={location} onChange={ handleInputChange } />
               
               <FormControl isRequired>
                  <FormLabel fontSize='lg'>Descripción</FormLabel>
                  <Textarea type='text' name='description' value = { description } 
                     onChange={ handleInputChange } 
                     maxLength={280} placeholder='Tienes un "tweet" para contarle a las empresas más acerca de ti  (280 caracteres).'/>
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
               <Buttons isLoading={isUpdating} cancelRoute='/dev/profile' actionText='Guardar'/>
            </VStack>
         </form>
      </VStack>
   );
};

export default EditDeveloperProfile;
