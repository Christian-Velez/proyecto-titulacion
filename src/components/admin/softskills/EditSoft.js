// Hooks
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Info
import { startUpdatingSoft } from 'actions/admin/softskills';
import { errorAlert, successAlert } from 'helpers/SwalAlerts';

// Componentes
import Buttons from 'components/forms/Buttons';
import ProfilePhoto from 'components/ProfilePhoto';
import {
   FormControl,
   FormLabel,
   Heading,
   Input,
   VStack,
} from '@chakra-ui/react';



const EditSoft = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [isSaving, setIsSaving] = useState(false);

   // Todas las soft skills guardadas en el store
   const { softskills } = useSelector(state => state.soft);
   const softskill = softskills.find(soft => soft.id === id);

   // Form Values
   const [name, setName] = useState('');
   const [img, setImg] = useState(null);

   useEffect(() => {
      // Establece los valores guardados
      if (softskill) {
         setName(softskill.name);
         setImg(softskill.img);
      }
   }, [softskill]);


   const handleEditSoft = (e) => {
      e.preventDefault();

      setIsSaving(true);

      dispatch(startUpdatingSoft({ id, name, img }))
         .then(() => {
            setIsSaving(false);
            navigate('/admin/soft-skills');
            successAlert({ message: 'Soft skill editada' });
         })
         .catch(err => {
            console.log(err);
            errorAlert({ message: 'Ocurrio un error al tratar de editar la soft skill' });
            setIsSaving(false);
         });
   };

   return (
      <VStack
         padding={{ base: 7, lg: 20 }}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
      >
         <Heading>
            Editando {softskill && softskill.name}
         </Heading>

         <form
            style={{ width: '100%' }}
            onSubmit={handleEditSoft}
         >
            <VStack
               spacing={8}
               width={{ base: 'full', lg: '60%' }}
               alignItems='flex-start'
            >
               {
                  img && 
                  <ProfilePhoto 
                     current={img}
                     setProfilePhoto={setImg}
                     text='Icono'
                     isRounded={false}
                  />
               }
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

               <Buttons actionText='Guardar' cancelRoute='/admin/soft-skills' isLoading={isSaving}/>
            </VStack>
         </form>
      </VStack>
   );
};

export default EditSoft;
