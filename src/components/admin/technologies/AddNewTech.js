import {
   Heading,
   VStack
} from '@chakra-ui/react';



import AddNewTechForm from './AddNewTechForm';

const AddNewTech = () => {
   return (
      <VStack
         padding={{ base: 7, lg: 20 }}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
      >
         <Heading>
            Agregar nueva tecnología
         </Heading>

         <AddNewTechForm />
         
      </VStack>
   );
};

export default AddNewTech;
