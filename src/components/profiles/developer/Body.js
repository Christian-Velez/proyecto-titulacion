import React, { useEffect, useMemo } from 'react';
import TechnologiesCards from './TechnologiesCards';
import ProjectsCards from './ProjectsCards';
import CertificationsCards from './CertificationsCards';
import SoftskillsCards from './SoftskillsCards';
import EducationCards from './EducationCards';
import {
   Divider,
   Text,
   Heading,
   HStack,
   VStack,
   Button,
   useDisclosure,
} from '@chakra-ui/react';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import RateModal from './RateModal';
import { getProm } from '../getProm';
import { Rating } from 'react-simple-star-rating';
import './styles.css';
import { startGettingDevCompanies } from 'actions/developer/user';
import DevCompanies from './DevCompanies';

const Body = ({ devInfo, isMyProfile }) => {
   const dispatch = useDispatch();
   const { id: devId, qualifications } = devInfo;
   const { id: companyId } = useSelector(state => state.companyInfo);
   const { employees } = useSelector(state => state.companyInfo);
   const { isOpen, onOpen, onClose } =
      useDisclosure();

   const { companies } = useSelector(state => state.devInfo);
   useEffect(() => {
      if(isMyProfile) {
         dispatch(startGettingDevCompanies(devId));
      }

   }, [isMyProfile, devId, dispatch])

   const isMyEmployee = employees.some(
      (item) => item.employee.id === devId
   );
   const alreadyRated = qualifications.some(
      (item) => item.ratedBy === companyId
   );

   const devRatings = useMemo(() => {
      const initialValue = {
         responsable: [],
         comprometido: [],
         cooperativo: [],
         conflictos: [],
      };

      qualifications.forEach((element) => {
         const { ratings } = element;
         const keys = Object.keys(ratings);

         keys.forEach((key) => {
            initialValue[key]?.push(ratings[key]);
         });
      });
      return initialValue;
   }, [qualifications]);

   const responsable =
      devRatings.responsable.length === 0
         ? 0
         : getProm(devRatings.responsable);

   const comprometido =
      devRatings.comprometido.length === 0
         ? 0
         : getProm(devRatings.comprometido);

   const cooperativo =
      devRatings.cooperativo.length === 0
         ? 0
         : getProm(devRatings.cooperativo);

   const conflictos =
      devRatings.conflictos.length === 0
         ? 0
         : getProm(devRatings.conflictos);

   const config = {
      readonly: true,
      size: 20,
   };

   return (
      <>
         {
            isMyProfile && companies?.length > 0 &&
            <>
               <Divider />
               <VStack w='full' alignItems='flex-start'>
                  <Heading
                     fontSize={{
                        base: 'lg',
                        '2xl': 'xl',
                     }}
                  >
                     Empresas con las que trabajas ({companies.length})
                  </Heading>
                  <Text
                     color='gray.600'
                     fontSize={{ base: 'sm', xl: 'md' }}
                  >
                     (Solo tú puedes ver esta
                     información)
                  </Text>
                  <DevCompanies companies={companies} />
               </VStack>
            </>
         }


         {isMyEmployee && (
            <RateModal
               isOpen={isOpen}
               onOpen={onOpen}
               onClose={onClose}
               devInfo={devInfo}
            />
         )}
         <VStack
            w='full'
            alignItems='flex-start'
            spacing={10}
         >
            <Divider />
            <VStack
               w={{
                  base: 'full',
                  xl: '50%',
                  '2xl': '40%',
               }}
               alignItems='flex-start'
            >
               <HStack spacing={5}>
                  <Heading
                     fontSize={{
                        base: 'lg',
                        '2xl': 'xl',
                     }}
                  >
                     Calificaciones (
                     {qualifications.length})
                  </Heading>
                  {isMyEmployee && !alreadyRated && (
                     <Button
                        colorScheme='brandPrimaryPurple'
                        onClick={onOpen}
                     >
                        {' '}
                        Calificar{' '}
                     </Button>
                  )}
               </HStack>

               <VStack w='full' p={5}>
                  <HStack
                     w='full'
                     justifyContent='space-between'
                  >
                     <Text> Responsable </Text>
                     <Rating
                        {...config}
                        initialValue={responsable}
                     />
                  </HStack>

                  <HStack
                     w='full'
                     justifyContent='space-between'
                  >
                     <Text> Comprometido </Text>
                     <Rating
                        {...config}
                        initialValue={
                           comprometido
                        }
                     />
                  </HStack>

                  <HStack
                     w='full'
                     justifyContent='space-between'
                  >
                     <Text> Cooperativo </Text>
                     <Rating
                        {...config}
                        initialValue={cooperativo}
                     />
                  </HStack>

                  <HStack
                     w='full'
                     justifyContent='space-between'
                  >
                     <Text>
                        Manejo de conflictos
                     </Text>
                     <Rating
                        {...config}
                        initialValue={conflictos}
                     />
                  </HStack>
               </VStack>
            </VStack>

            <Divider />
            <VStack
               w='full'
               alignItems='flex-start'
            >
               <Heading
                  fontSize={{
                     base: 'lg',
                     '2xl': 'xl',
                  }}
               >
                  Tecnologías
               </Heading>

               <TechnologiesCards
                  devInfo={devInfo}
               />
            </VStack>

            <Divider />
            <VStack
               w='full'
               alignItems='flex-start'
            >
               <Heading
                  fontSize={{
                     base: 'lg',
                     '2xl': 'xl',
                  }}
               >
                  Proyectos
               </Heading>
               <Text
                  color='gray.600'
                  fontSize={{
                     base: 'sm',
                     xl: 'md',
                  }}
               >
                  {' '}
                  Los links proporcionados son
                  externos a la plataforma y
                  responsabilidad del
                  desarrollador que los registra
                  en su perfil. No se garantiza la
                  seguridad al hacer click.
               </Text>

               <ProjectsCards devInfo={devInfo} />
            </VStack>

            <Divider />
            <VStack
               w='full'
               alignItems='flex-start'
            >
               <Heading
                  fontSize={{
                     base: 'lg',
                     '2xl': 'xl',
                  }}
               >
                  Educación
               </Heading>

               <EducationCards
                  devInfo={devInfo}
               />
            </VStack>

            <Divider />
            <VStack
               w='full'
               alignItems='flex-start'
            >
               <Heading
                  fontSize={{
                     base: 'lg',
                     '2xl': 'xl',
                  }}
               >
                  Licencias y certificaciones
               </Heading>

               <CertificationsCards
                  devInfo={devInfo}
               />
            </VStack>

            <Divider />
            <VStack
               w='full'
               alignItems='flex-start'
            >
               <Heading
                  fontSize={{
                     base: 'lg',
                     '2xl': 'xl',
                  }}
               >
                  Mis soft skills
               </Heading>

               <SoftskillsCards
                  devInfo={devInfo}
               />
            </VStack>
         </VStack>
      </>
   );
};

Body.propTypes = {
   devInfo: PropTypes.object,
};

export default Body;
