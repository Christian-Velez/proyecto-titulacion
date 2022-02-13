import React, {
   useEffect,
   useState,
} from 'react';
import {
   FormControl,
   FormLabel,
   Heading,
   Text,
   Textarea,
   VStack,
} from '@chakra-ui/react';
import ProfilePhoto from 'components/layout/ProfilePhoto';
import { useForm } from 'hooks/useForm';
import BasicInput from 'components/forms/BasicInput';
import Buttons from 'components/forms/Buttons';
import {
   useDispatch,
   useSelector,
} from 'react-redux';
import { isEmpty } from 'validator';
import { startUpdatingCompanyInfo } from 'actions/company/user';
import { useNavigate } from 'react-router-dom';
import { errorAlert } from 'helpers/SwalAlerts';
import Layout from 'components/layout';

const EditCompanyProfileScreen = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   // Informacion de la empresa
   const companyInfo = useSelector((state) => state.companyInfo);
   const [formValues, handleInputChange] =
      useForm({
         name: companyInfo.name,
         line: companyInfo.line,
         location: companyInfo.location,
         description: companyInfo.description,
      });
   const { name, line, location, description } = formValues;
   const [ profilePhoto, setProfilePhoto ] = useState(companyInfo.img);


   const handleEditCompanyProfile = async (e) => {
      e.preventDefault();
    
      if (isEmpty(name) || isEmpty(location) || isEmpty(description)) {
         return errorAlert({ message: 'Completa todos los campos requeridos para actualizar tu perfil' });
      }

      const companyInfo = {
         ...formValues,
         profilePhoto,
      };

      dispatch(startUpdatingCompanyInfo(companyInfo, navigate));
   };


   return (
      <Layout
         padding={{ base: 10, lg: 30, xl: 40 }}
      >
         <VStack alignItems='flex-start'>
            <Heading>Editando tu perfil</Heading>
            <Text fontStyle='italic'>
               No olvides guardar los cambios
            </Text>
         </VStack>

         <form
            style={{ width: '100%'}}
            onSubmit={handleEditCompanyProfile}
         >
            <VStack
               spacing={8}
               width={{ base: 'full', lg: '60%' }}
               alignItems='flex-start'
            >
               <ProfilePhoto
                  setProfilePhoto={
                     setProfilePhoto
                  }
                  current={profilePhoto}
                  text='Foto de perfil'
               />

               <BasicInput
                  text='Nombre de la empresa'
                  name='name'
                  minLength={3}
                  value={name}
                  onChange={handleInputChange}
               />

               <BasicInput
                  text='Giro'
                  name='line'
                  minLength={3}
                  value={line}
                  onChange={handleInputChange}
               />

               <BasicInput
                  text='Localización'
                  name='location'
                  value={location}
                  onChange={handleInputChange}
               />

               <FormControl isRequired>
                  <FormLabel fontSize='lg'>
                     Descripción
                  </FormLabel>
                  <Textarea
                     type='text'
                     name='description'
                     value={description}
                     onChange={handleInputChange}
                     maxLength={280}
                     placeholder='Tienes un "tweet" para contarle a los desarrolladores acerca de tu empresa (280 caracteres).'
                  />
               </FormControl>

               <Buttons
                  cancelRoute='/co/profile'
                  actionText='Guardar'
               />
            </VStack>
         </form>
      </Layout>
   );
};

EditCompanyProfileScreen.propTypes = {};

export default EditCompanyProfileScreen;
