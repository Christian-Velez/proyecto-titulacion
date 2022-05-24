import React, { useState } from 'react';
import Layout from 'components/layout';
import BasicInput from 'components/forms/BasicInput';
import {
   Button,
   Heading,
   HStack,
   Text,
   VStack,
} from '@chakra-ui/react';
import {
   useDispatch,
   useSelector,
} from 'react-redux';
import { useForm } from 'hooks/useForm';
import { startSavingDefaultMessages } from 'actions/company/user';

const ConfigurationScreen = () => {
   const dispatch = useDispatch();
   const { defaultMessages = {} } = useSelector(
      (state) => state.companyInfo
   );

   const [error, setError] = useState('');
   const [formValues, handleInputChage] = useForm(
      {
         acceptPost:
            defaultMessages.acceptPost || '',
         hireDev: defaultMessages.hireDev || '',
         fireDev: defaultMessages.fireDev || '',
      }
   );
   const { acceptPost, hireDev, fireDev } =
      formValues;

   const handleSave = () => {
      if (!acceptPost && !hireDev && !fireDev) {
         return setError(
            'Completa al menos un campo'
         );
      }

      setError('');
      dispatch(
         startSavingDefaultMessages(formValues)
      );
   };

   return (
      <Layout title='Configuración'>
         <VStack
            w='100%'
            spacing={5}
            alignItems='flex-start'
         >
            <Heading fontSize='lg'>
               Mensajes predeterminados
            </Heading>
            <VStack
               spacing={5}
               w={{ base: 'full', '2xl': '30%' }}
            >
               <BasicInput
                  isRequired={false}
                  text='Al aceptar una postulación'
                  name='acceptPost'
                  placeholder='e. g: Hola, hemos aceptado tu postulación...!'
                  value={acceptPost}
                  onChange={handleInputChage}
               />

               <BasicInput
                  isRequired={false}
                  text='Al contratar a un programador'
                  name='hireDev'
                  placeholder='e. g: Hola, bienvenido a...!'
                  value={hireDev}
                  onChange={handleInputChage}
               />

               <BasicInput
                  isRequired={false}
                  text='Al despedir a un programador'
                  name='fireDev'
                  placeholder='e. g: Lo sentimos...!'
                  value={fireDev}
                  onChange={handleInputChage}
               />

               <Text color='red.500'>
                  {error}
               </Text>

               <HStack
                  w='full'
                  justifyContent='flex-end'
               >
                  <Button
                     colorScheme='brandPrimaryPurple'
                     onClick={handleSave}
                  >
                     Guardar
                  </Button>
               </HStack>
            </VStack>
         </VStack>
      </Layout>
   );
};

export default ConfigurationScreen;
