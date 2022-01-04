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
import Swal from 'sweetalert2';
import Buttons from 'components/Buttons';

const AddNewSoftForm = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false);

   const [img, setImg] = useState();
   const [name, setName] = useState('');

   const handleSubmitNewSoft = (e) => {
      e.preventDefault();

      if(!img || !name){
         Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Rellene todos los campos solicitados',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });
      }
      else{
         dispatch(startSubmittingSoftSkill(name, img, navigate, setIsLoading));
      }
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

            <FormControl isRequired>
               <FormLabel fontSize='lg'>
                  Icono
               </FormLabel>
               <Input
                  type='file'
                  name='img'
                  accept='image/png, image/jpeg, .svg'
                  onChange={(e) => {
                     setImg(e.target.files[0]);
                  }}
               />
            </FormControl>

            <Buttons cancelRoute='/admin/soft-skills' isLoading={isLoading} actionText='Agregar'/>
         </VStack>
      </form>
   );
};

export default AddNewSoftForm;
