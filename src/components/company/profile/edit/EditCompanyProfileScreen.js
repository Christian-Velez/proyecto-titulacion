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
import ProfilePhoto from 'components/ProfilePhoto';
import { useForm } from 'hooks/useForm';
import BasicInput from 'components/forms/BasicInput';
import Buttons from 'components/forms/Buttons';
import {
   useDispatch,
   useSelector,
} from 'react-redux';
import { isEmpty } from 'validator';
import Swal from 'sweetalert2';
import { startUpdatingCompanyInfo } from 'actions/company/user';
import { useNavigate } from 'react-router-dom';

const EditCompanyProfileScreen = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [isUpdating, setIsUpdating] =
      useState(false);
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   // Informacion previa
   const companyInfo = useSelector(
      (state) => state.companyInfo
   );
   const [formValues, handleInputChange] =
      useForm({
         name: companyInfo.name,
         line: companyInfo.line,
         location: companyInfo.location,
         description: companyInfo.description,
      });
   const { name, line, location, description } = formValues;
   const [profilePhoto, setProfilePhoto] = useState(companyInfo.img);


   const handleEditCompanyProfile = (e) => {
      e.preventDefault();
    
      if (isEmpty(name) || isEmpty(location) || isEmpty(description)) {
         return Swal.fire({
            icon: 'warning',
            title: 'Error...',
            text: 'Completa todos los campos requeridos para actualizar tu perfil',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });
      }

      dispatch(
         startUpdatingCompanyInfo(
            {
               name,
               line,
               location,
               description,
               profilePhoto,
            },
            navigate,
            setIsUpdating
         )
      );
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
                  isLoading={isUpdating}
                  cancelRoute='/co/profile'
                  actionText='Guardar'
               />
            </VStack>
         </form>
      </VStack>
   );
};

EditCompanyProfileScreen.propTypes = {};

export default EditCompanyProfileScreen;
