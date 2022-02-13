// Hooks
import React from 'react';

// Componentes
import AddNewSoftForm from './AddNewSoftForm';
import {
   Heading,
} from '@chakra-ui/react';
import Layout from 'components/layout';


const AddNewSoft = () => {
   return (
      <Layout>
         <Heading>
            Agregar nueva soft skill
         </Heading>

         <AddNewSoftForm />

      </Layout>
   );
};

export default AddNewSoft;
