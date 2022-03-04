import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
   Button,
   Flex,
   Heading,
   Stack,
   Text,
   VStack,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalCloseButton,
   ModalHeader,
   ModalBody,
   ModalFooter,
   useDisclosure,
} from '@chakra-ui/react';
import IconImg from 'components/layout/IconImg';
import {
   useDispatch,
   useSelector,
} from 'react-redux';
import BasicInput from 'components/forms/BasicInput';
import { startAddingNewTechToDevStack } from 'actions/developer/user';

const TechnologyMainInfo = ({ technology }) => {
   const dispatch = useDispatch();
   const { isOpen, onOpen, onClose } =
      useDisclosure();

   const { img, name, type } = technology;
   const { role } = useSelector(
      (state) => state.auth
   );

   const [error, setError] = useState('');
   const [
      yearsOfExperience,
      setYearsOfExperience,
   ] = useState('');
   const handleInputChange = (e) =>
      setYearsOfExperience(e.target.value);
   const handleAddTech = () => {
      if (yearsOfExperience === '') {
         setError(
            'Ingresa los años de experiencia'
         );
      } else if (
         parseInt(yearsOfExperience) > 30 ||
         parseInt(yearsOfExperience) < 0
      ) {
         setError(
            'Los años tienen que estar dentro del rango 0 - 30'
         );
      } else {
         setError('');
         dispatch(
            startAddingNewTechToDevStack(
               technology,
               yearsOfExperience
            )
         );
         onClose();
      }
   };

   const { technologies: devTechs } = useSelector(
      (state) => state.devInfo
   );
   const formatedTechs = devTechs.map(
      (devTech) => {
         const { id } = devTech.technology;
         return id;
      }
   );
   const technologyAlreadyAdded =
      formatedTechs.includes(technology.id);

   return (
      <>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>{name}</ModalHeader>

               <ModalCloseButton />
               <ModalBody pb={6}>
                  <BasicInput
                     text='Años de experiencia'
                     type='number'
                     placeholder='(0 - 30)'
                     min='0'
                     max='30'
                     name='yearsOfExperience'
                     value={yearsOfExperience}
                     onChange={handleInputChange}
                  />
                  <Text color='red.500'>
                     {error}{' '}
                  </Text>
               </ModalBody>

               <ModalFooter>
                  <Button onClick={handleAddTech}>
                     Agregar
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
         <Stack
            width='full'
            justifyContent={{ xl: 'flex-start' }}
            alignItems={{
               base: 'center',
               xl: 'flex-start',
            }}
            direction={{
               base: 'column',
               xl: 'row',
            }}
            spacing={{ base: 10, xl: 40 }}
         >
            {/*  Foto de perfil */}
            <Flex w='max-content' pt={5}>
               <IconImg
                  src={img}
                  alt='Profile photo'
                  boxSize={{
                     base: '200px',
                     lg: '250px',
                     xl: '250px',
                  }}
               />
            </Flex>

            {/*Info*/}
            <VStack
               w={{ base: 'full', xl: '60%' }}
               alignItems={{
                  base: 'center',
                  xl: 'flex-start',
               }}
               pt={{ base: 0, lg: 10 }}
               spacing={5}
               textAlign={{
                  base: 'center',
                  xl: 'initial',
               }}
            >
               <Heading
                  fontSize={{
                     base: '2xl',
                     lg: '4xl',
                  }}
               >
                  {name}
               </Heading>
               <Text> {type} </Text>

               {
                  (role === 'Developer' && !technologyAlreadyAdded) &&
                     <Button
                        colorScheme='brandPrimaryPurple'
                        onClick={onOpen}
                     >
                        Agregar a mi stack
                     </Button>
               
               }
            </VStack>
         </Stack>
      </>
   );
};

TechnologyMainInfo.propTypes = {
   technology: PropTypes.object,
};

export default TechnologyMainInfo;
