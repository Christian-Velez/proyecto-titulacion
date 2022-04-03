// Hooks
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'hooks/useForm';
import { formatSoftskills } from 'helpers/formatSoftskills';
import { startUpdatingDevInfo } from 'actions/developer/user';
import { isEmpty } from 'validator';
import { 
   Badge,
   Button,
   FormControl, 
   FormHelperText, 
   FormLabel, 
   Heading, 
   Text, 
   Textarea, 
   VStack 
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { errorAlert } from 'helpers/SwalAlerts';
import { processDevInfo } from 'helpers/developer/processDevInfo';
import { startLoading } from 'actions/ui';
import useScrollToTop from 'hooks/useScrollToTop';
import ProfilePhoto from 'components/layout/ProfilePhoto';
import BasicInput from 'components/forms/BasicInput';
import Buttons from 'components/forms/Buttons';
import Technologies from 'components/forms/Technologies';
import Projects from './editForm/Projects';
import Education from './editForm/Education';
import Certifications from './editForm/Certifications';
import Layout from 'components/layout';
import Softskills from './editForm/Softskills';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Curriculum from 'components/developer/pdf/Curriculum';

const EditDeveloperProfile = () => {
   useScrollToTop();
   const navigate = useNavigate();
   const dispatch = useDispatch();
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

   //const [curriculum, setCurriculum] = useState();

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
                     maxLength={280} placeholder='Tienes un "tweet" para contarle a las empresas más acerca de ti  (280 caracteres).'
                  />
               </FormControl>
               <FormControl>
                  <FormLabel fontSize='lg'>Currículum</FormLabel>
                  <Button>Adjuntar</Button>

                  <FormHelperText marginTop={5}>
                     ¿No tienes uno? 

                     <PDFDownloadLink document={<Curriculum devInfo={devInfo}/>} fileName='CV.pdf'>

                     {({ blob, url, loading, error }) =>
                        loading 
                           ? <Badge colorScheme='red' marginLeft={3}>Cargando...</Badge> 
                           : <Badge colorScheme='cyan' marginLeft={3}>Descargar!</Badge>
                     }
                     </PDFDownloadLink>
                  
                  </FormHelperText>
               </FormControl>
               <Technologies technologies={technologies} setTechnologies={setTechnologies}/>
               <Projects projects={projects} setProjects={setProjects} />
               <Education education={education} setEducation={setEducation}/>
               <Certifications certifications={certifications} setCertifications={setCertifications}/>
               <Softskills selectedSofts={selectedSofts} setSelectedSofts={setSelectedSofts}/>
               <Buttons cancelRoute='/dev/profile' actionText='Guardar'/>
            </VStack>
         </form>
      </Layout>
   );
};

export default EditDeveloperProfile;
