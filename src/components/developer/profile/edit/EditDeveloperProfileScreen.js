// Hooks
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'hooks/useForm';
import useScrollToTop from 'hooks/useScrollToTop';

// Info
import { formatSoftskills } from 'helpers/formatSoftskills';
import { startUpdatingDevInfo } from 'actions/developer/user';
import { isEmpty } from 'validator';

// Componentes
import ProfilePhoto from 'components/layout/ProfilePhoto';
import BasicInput from 'components/forms/BasicInput';
import Buttons from 'components/forms/Buttons';

import Technologies from 'components/forms/Technologies';
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
import { useNavigate } from 'react-router-dom';
import { errorAlert } from 'helpers/SwalAlerts';
import { processDevInfo } from 'helpers/developer/processDevInfo';
import { startLoading } from 'actions/ui';
import Layout from 'components/layout';

const EditDeveloperProfile = () => {
   useScrollToTop();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   

   // Obtener opciones DISPONIBLES (todas)
   const { softskills } = useSelector(state => state.soft);   
   const [softsHere] = useState(formatSoftskills([...softskills]));
   const devInfo = useSelector(state => state.devInfo);
 

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
   const handleEditDevProfile = async (e) => {
      e.preventDefault();

      if(isEmpty(name) || isEmpty(location) || isEmpty(description)){
         return errorAlert({ message: 'Completa todos los campos requeridos para actualizar tu perfil' });
      }

      dispatch(startLoading());
      const devInfo = {
         profilePhoto,
         name,
         location,
         description,
         technologies,
         projects,
         education,
         certifications,
         selectedSofts
      };

      const formatedDevInfo = await processDevInfo(devInfo);
      dispatch(startUpdatingDevInfo(formatedDevInfo, navigate));
   };

   return (
      <Layout
         padding={{ base: 10, lg: 30, xl: 40 }}
      >  
         <VStack alignItems='flex-start'>
            <Heading> Editando tu perfil </Heading>
            <Text fontStyle='italic'>No olvides guardar los cambios</Text> 
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
               <Buttons cancelRoute='/dev/profile' actionText='Guardar'/>
            </VStack>
         </form>
      </Layout>
   );
};

export default EditDeveloperProfile;
