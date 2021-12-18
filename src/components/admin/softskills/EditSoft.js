import {
   Button,
   FormControl,
   FormHelperText,
   FormLabel,
   Heading,
   Input,
   Stack,
   VStack,
} from '@chakra-ui/react';
import { startUpdatingSoft } from 'actions/admin/softskills';
import React, {
   useEffect,
   useState,
} from 'react';
import {
   useDispatch,
   useSelector,
} from 'react-redux';
import {
   useNavigate,
   useParams,
} from 'react-router-dom';

const EditSoft = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   // Controlar los valores del form
   const [name, setName] = useState('');
   const [img, setImg] = useState(null);

   // Todas las soft skills guardadas en el store
   const { softskills } = useSelector(
      (state) => state.soft
   );
   // Tecnologia actual a editar
   const softskill = softskills.find(
      (soft) => soft.id === id
   );

   useEffect(() => {
      // Establece los valores guardados
      if (softskill) {
         setName(softskill.name);
         setImg(softskill.img);
      }
   }, [softskill]);



   const handleEditSoft = (e) => {
      e.preventDefault();
      dispatch(startUpdatingSoft(id, name, img, navigate));
   };

   return (
      <VStack
         padding={{ base: 7, lg: 20 }}
         spacing={20}
         alignItems='flex-start'
         w='full'
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

               <FormControl>
                  <FormLabel fontSize='lg'>
                     Icono
                  </FormLabel>
                  <Input
                     type='file'
                     id='img'
                     accept='image/png, image/jpeg'
                     onChange={(e) => {
                     setImg(
                        e.target.files[0]
                     );
                  }}
                  />
                  <FormHelperText> Si no adjuntas ninguna imagen, se quedará con la anterior </FormHelperText>
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
                     Guardar
                  </Button>
               </Stack>
            </VStack>
         </form>
      </VStack>
   );
};

export default EditSoft;
