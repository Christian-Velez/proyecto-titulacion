import React, { useState } from 'react';
import Layout from 'components/layout';
import IconImg from 'components/layout/IconImg';
import LoadingScreen from 'components/layout/LoadingScreen';
import SearchForm from './SearchForm';
import {
   Divider,
   Heading,
   HStack,
   Text,
   VStack,
   Link as ChakraLink
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Cambiar el idioma de timeAgo a español
import 'helpers/timeAgoRegister';
import { format } from 'timeago.js';

const SearchCompanyScreen = () => {
   const { loading } = useSelector(state => state.ui);

   const [companies, setCompanies] = useState([]);
   const [firstSearch, setFirstSearch] =
      useState(false);

   const isEmpty = companies.length === 0;

   return (
      <Layout title='Buscar empresas'>
         <Divider />
         <SearchForm
            setCompanies={setCompanies}
            setFirstSearch={setFirstSearch}
         />

         {/*  Results */}

         <VStack marginBottom={isEmpty && 50} w='full' spacing={5}>
            {firstSearch ? (
               <>
                  <Heading fontSize='2xl'>
                     Resultados
                  </Heading>

                  {
                     loading
                        ? <LoadingScreen />
                        
                        :
                        isEmpty
                           ? <Text> Sin resultados </Text>
                           :
                           companies.map(company => {
                              const { id, name, img, location, lastSeen } = company;

                              return (
                                 <HStack 
                                    key={id}
                                    w='full' 
                                    spacing={5} 
                                    border='1px solid'
                                    borderColor='gray.100'
                                    borderRadius='md'
                                    padding={{ base: 5, lg: 7}}
                                 >
                                    <IconImg 
                                       src={img}
                                       alt={name}
                                       boxSize={{ base: '100px '}}
                                    />

                                    <VStack maxW='calc(100% - 150px)' alignItems='flex-start'>
                                       <ChakraLink as={Link} to={ `/dev/search/${id}` }> { name } </ChakraLink>
                                       <Text> última conexión: { format(lastSeen, 'es_ES')}</Text>
                                       <Text> Localización: {location} </Text>
                                    </VStack>
                                 </HStack>
                              );
                           })
                  }
               </>
            ) : null}
         </VStack>
      </Layout>
   );
};

export default SearchCompanyScreen;
