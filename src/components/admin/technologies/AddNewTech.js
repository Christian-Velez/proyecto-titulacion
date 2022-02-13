import {
   Heading,
} from '@chakra-ui/react';
import Layout from 'components/layout';



import AddNewTechForm from './AddNewTechForm';

const AddNewTech = () => {
   return (
      <Layout>
         <Heading>
            Agregar nueva tecnología
         </Heading>

         <AddNewTechForm />
         
      </Layout>
   );
};

export default AddNewTech;
