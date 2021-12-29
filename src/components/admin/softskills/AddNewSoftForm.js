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
   Stack,
   Button,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';

const AddNewSoftForm = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

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
         dispatch(startSubmittingSoftSkill(name, img, navigate));
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
                        '/admin/soft-skills'
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
                  Agregar
               </Button>
            </Stack>
         </VStack>
      </form>
   );
};

export default AddNewSoftForm;
