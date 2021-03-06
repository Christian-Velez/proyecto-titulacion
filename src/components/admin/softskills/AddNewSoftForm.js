// Hooks
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Info
import { startSubmittingSoftSkill } from 'actions/admin/softskills';

// Componentes
import {
   VStack,
} from '@chakra-ui/react';
import Buttons from 'components/forms/Buttons';
import ProfilePhoto from 'components/layout/ProfilePhoto';
import { errorAlert } from 'helpers/SwalAlerts';
import BasicInput from 'components/forms/BasicInput';

const AddNewSoftForm = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [img, setImg] = useState();
   const [name, setName] = useState('');

   const handleSubmitNewSoft = async (e) => {
      e.preventDefault();

      if (!img || !name) {
         return errorAlert({
            message:
               'Rellene todos los campos solicitados',
         });
      }

      dispatch(
         startSubmittingSoftSkill(
            { name, img },
            navigate
         )
      );
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

            <BasicInput
               text='Nombre'
               name='name'
               value={name}
               onChange={(e) => {
                  setName(e.target.value);
               }}
            />

            <Buttons
               cancelRoute='/admin/soft-skills'
               actionText='Agregar'
            />
         </VStack>
      </form>
   );
};

export default AddNewSoftForm;
