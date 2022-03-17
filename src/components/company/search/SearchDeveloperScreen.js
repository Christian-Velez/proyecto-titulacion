

import React, { useState } from 'react';
import SearchForm from './SearchForm';
import LoadingScreen from 'components/layout/LoadingScreen';
import IconImg from 'components/layout/IconImg';
import Layout from 'components/layout';
import { Link } from 'react-router-dom';
import {
   Divider,
   Heading,
   VStack,
   Link as ChakraLink,
   Text,
   HStack,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

// Cambiar el idioma de timeAgo a español
import 'helpers/timeAgoRegister';
import { format } from 'timeago.js';

const SearchDeveloperScreen = () => {
   const { loading } = useSelector(state => state.ui);

   const [developers, setDevelopers] = useState([]);
   const [firstSearch, setFirstSearch] = useState(false);

   const isEmpty = developers.length === 0;

   return (
      <Layout title='Buscar desarrolladores'>
         <Divider />
         <SearchForm setDevelopers={setDevelopers} setFirstSearch={setFirstSearch}/>

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
                           developers.map(developer => {
                              const { id, name, img, location, lastSeen, age } = developer;
                                 
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
                                       src={img || ''}
                                       alt={name}
                                       boxSize={{ base: '100px '}}
                                    />

                                    <VStack maxW='calc(100% - 150px)' alignItems='flex-start'>
                                       <ChakraLink as={Link} to={ `/co/search/${id}` }> { name }, {age} años </ChakraLink>
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

export default SearchDeveloperScreen;