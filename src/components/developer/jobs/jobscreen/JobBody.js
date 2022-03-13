import React from 'react';
import PropTypes from 'prop-types';
import {
   Divider,
   Heading,
   HStack,
   Text,
   VStack,
} from '@chakra-ui/react';
import IconImg from 'components/layout/IconImg';

const JobBody = ({ jobInfo }) => {
   const {
      description,
      category,
      techsRequired,
      additional,
      softsRequired,
   } = jobInfo;


   const TechItem = (tech) => {
      const {
         technology,
         yearsOfExperience: years,
         _id,
      } = tech;

      return (
         <HStack
            key={_id}
            spacing={5}
         >
            <IconImg
               src={technology.img}
               alt={technology.name}
               boxSize={{
                  base: '30px',
               }}
            />

            <VStack
               alignItems='flex-start'
               spacing={0}
            >
               <Heading fontSize='md'>
                  {technology.name}
               </Heading>
               <Text>
                  {years === 0
                     ? 'sin experiencia'
                     : years === 1
                        ? `${years} año de experiencia`
                        : `${years} años de experiencia`}
               </Text>
            </VStack>
         </HStack>
      );
   };

   const SoftItem = (soft) => {
      const { name, img, id } = soft;

      return (
         <HStack
            key={id}
            spacing={5}
         >
            <IconImg
               src={img}
               alt={name}
               boxSize={{
                  base: '30px',
               }}
            />

            <VStack
               alignItems='flex-start'
               spacing={0}
            >
               <Heading fontSize='md'>
                  {name}
               </Heading>
               
            </VStack>
         </HStack>
      );
   };
   

   return (
      <VStack w='full' alignItems='flex-start' spacing={10}>
         <VStack w='full' alignItems='flex-start'>
            <Divider />

            <Heading
               fontSize={{
                  base: 'lg',
                  '2xl': 'xl',
               }}
            >
               Categoría
            </Heading>
            <Text> {category} </Text>
         </VStack>

         <VStack w='full' alignItems='flex-start'>
            <Heading
               fontSize={{
                  base: 'lg',
                  '2xl': 'xl',
               }}
            >
               Descripción
            </Heading>
            <Text whiteSpace='pre-wrap'> {description} </Text>
         </VStack>

         {
            techsRequired.length > 0 && 
            <VStack w='full' alignItems='flex-start'>
               <Heading
                  fontSize={{
                     base: 'lg',
                     '2xl': 'xl',
                  }}
               >
                  Tecnologías
               </Heading>
               <VStack
                  w='full'
                  alignItems='flex-start'
                  spacing={5}
               >
                  {techsRequired.map((tech) => TechItem(tech) )}
               </VStack>
            </VStack>
         }

         {
            softsRequired.length > 0 &&
            <VStack w='full' alignItems='flex-start'>
               <Heading
                  fontSize={{
                     base: 'lg',
                     '2xl': 'xl',
                  }}
               >
                  Soft skills
               </Heading>
               <VStack
                  w='full'
                  alignItems='flex-start'
                  spacing={5}
               >
                  {softsRequired.map((soft) => SoftItem(soft))}
               </VStack>
            </VStack>
         }

         {
            additional &&
            <VStack w='full' alignItems='flex-start'>
               <Heading
                  fontSize={{
                     base: 'lg',
                     '2xl': 'xl',
                  }}
               >
                  Extras
               </Heading>
               <Text> {additional} </Text>
            </VStack>
         }
      </VStack>
   );
};

JobBody.propTypes = {
   jobInfo: PropTypes.object,
};

export default JobBody;
