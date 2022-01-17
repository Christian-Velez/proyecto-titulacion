// Hooks
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Info
import { startSubmittingSoftSkill } from 'actions/admin/softskills';

// Componentes
import {
   VStack,
   FormControl,
   FormLabel,
   Input,
} from '@chakra-ui/react';
import Buttons from 'components/forms/Buttons';
import ProfilePhoto from 'components/ProfilePhoto';
import { errorAlert, successAlert } from 'helpers/SwalAlerts';

const AddNewSoftForm = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [isSubmitting, setIsSubmitting] = useState(false);

   const [img, setImg] = useState();
   const [name, setName] = useState('');

   const handleSubmitNewSoft = (e) => {
      e.preventDefault();

      if (!img || !name) {
         return errorAlert({ message: 'Rellene todos los campos solicitados' });
      }
         
      setIsSubmitting(true);
      dispatch(startSubmittingSoftSkill({name, img }))
         .then(() => {
            setIsSubmitting(false);
            navigate('/admin/soft-skills');
            successAlert({ message: 'Soft skill añadida' });
         })
         .catch(err => {
            console.log(err);
            errorAlert({ message: 'Ocurrio un error al tratar de agregar la soft skill'});
            setIsSubmitting(false);
         });
   };

   return (
      <form
         style={{ width: '100%' }}
         onSubmit={handleSubmitNewSoft}
      >
         <VStack
            spacing={8}
            width={{ base: 'full', lg: '60%' }}
            alignItems='flex-start'
         >
            <ProfilePhoto
               current={img}
               text='Icono'
               setProfilePhoto={setImg}
               isRounded={false}
               isRequired={true}
            />

            <FormControl isRequired>
               <FormLabel fontSize='lg'>
                  Nombre
               </FormLabel>
               <Input
                  type='text'
                  name='name'
                  value={name}
                  onChange={(e) => {
                     setName(e.target.value);
                  }}
               />
            </FormControl>

            <Buttons
               cancelRoute='/admin/soft-skills'
               isLoading={isSubmitting}
               actionText='Agregar'
            />
         </VStack>
      </form>
   );
};

export default AddNewSoftForm;
