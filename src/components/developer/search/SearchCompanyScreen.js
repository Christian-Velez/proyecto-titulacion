import { Divider, VStack } from '@chakra-ui/react';
import Layout from 'components/layout';
import React from 'react';
import SearchForm from './SearchForm';

const SearchCompanyScreen = () => {


   const isEmpty = true;

   return (
      <Layout title='Buscar empresas'>
         <Divider />
         <SearchForm />

         {/*  Results */}

         <VStack
            marginBottom={ isEmpty && 50 }
         >

         </VStack>

      </Layout>
   );
};

export default SearchCompanyScreen;
