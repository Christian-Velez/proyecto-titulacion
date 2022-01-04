// Hooks
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

// Info
import { startUpdatingSoft } from 'actions/admin/softskills';

// Componentes
import {
   FormControl,

   FormLabel,
   Heading,
   Input,
   VStack,
} from '@chakra-ui/react';
import Buttons from 'components/Buttons';
import ProfilePhoto from 'components/ProfilePhoto';



const EditSoft = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false);

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
      dispatch(startUpdatingSoft(id, name, img, navigate, setIsLoading));
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

               

               <Buttons actionText='Guardar' cancelRoute='/admin/soft-skills' isLoading={isLoading}/>
            </VStack>
         </form>
      </VStack>
   );
};

export default EditSoft;
