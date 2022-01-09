import {
   Divider,
   Text,
   Heading,
   HStack,
   VStack,
   UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import TechnologyCard from './TechnologyCard';
import EmptySection from './EmptySection';
import ProjectCard from './ProjectCard';
import EducationCard from './EducationCard';
import CertificationCard from './CertificationCard';
import SoftskillCard from './SoftskillCard';

const Body = () => {
   const { 
      technologies, 
      projects, 
      education, 
      certifications, 
      softskills 
   } = useSelector(state => state.devInfo);

   const technologiesCards = (technologies.length === 0) 
      ? <EmptySection /> : 
      technologies.map(tech => {
         const { technology, yearsOfExperience }  = tech;
         return <TechnologyCard key={technology.id} technology={technology} yearsOfExperience={yearsOfExperience}/>;
      });

   const projectsCards = (projects.length === 0) 
      ? <EmptySection /> 
      : projects.map(project => <ProjectCard key={project._id} project={project} />);


   const educationCards = (education.length === 0) 
      ?  <EmptySection />
      :  <UnorderedList 
            paddingLeft={10}
            spacing={3}
         >
            { education.map(ed => <EducationCard key={ed._id} education={ed} />) }
         </UnorderedList>;


      
   const certificationsCards = (certifications.length === 0) 
      ? <EmptySection />
      : certifications.map(cert => <CertificationCard key={cert._id} certification={cert}/>);

   const softskillsCards = (softskills.length === 0)
      ? <EmptySection />
      : softskills.map((soft, i) => <SoftskillCard key={i} soft={soft} />);




   return (
      <VStack
         w='full'
         alignItems='flex-start'
         spacing={10}
      >
         <Divider />
         <VStack
            w={{ base: 'full', xl: '50%' }}
            alignItems='flex-start'
         >
            <Heading fontSize={{ base: 'lg', '2xl': 'xl' }}>
               Calificaciones
            </Heading>

            <VStack w='full' p={5}>
               <HStack
                  w='full'
                  justifyContent='space-between'
               >
                  <Text> Responsable </Text> <Text fontWeight='black'>0.0 / 5</Text>
               </HStack>

               <HStack
                  w='full'
                  justifyContent='space-between'
               >
                  <Text> Comprometido </Text> <Text fontWeight='black'>0.0 / 5</Text>
               </HStack>

               <HStack
                  w='full'
                  justifyContent='space-between'
               >
                  <Text> Cooperativo </Text><Text fontWeight='black'>0.0 / 5</Text>
               </HStack>

               <HStack
                  w='full'
                  justifyContent='space-between'
               >
                  <Text>Manejo de conflictos</Text><Text fontWeight='black'>0.0 / 5</Text>
               </HStack>
            </VStack>
         </VStack>

         <Divider />
         <VStack w='full' alignItems='flex-start'>
            <Heading fontSize={{ base: 'lg', '2xl': 'xl' }}>
               Tecnologías
            </Heading>

            {technologiesCards}
         </VStack>

         <Divider />
         <VStack w='full' alignItems='flex-start'>
            <Heading fontSize={{ base: 'lg', '2xl': 'xl' }}>
               Proyectos
            </Heading>
            <Text color='gray.600' fontSize={{ base: 'sm', xl:'md'}}> Los links proporcionados son externos a la plataforma y responsabilidad del desarrollador que los registra en su perfil. No se garantiza la seguridad al hacer click.</Text>

            {projectsCards}
         </VStack>

         <Divider />
         <VStack w='full' alignItems='flex-start'>
            <Heading fontSize={{ base: 'lg', '2xl': 'xl' }}>
               Educación
            </Heading>
            {educationCards}
         </VStack>

         <Divider />
         <VStack w='full' alignItems='flex-start'>
            <Heading fontSize={{ base: 'lg', '2xl': 'xl' }}>
               Licencias y certificaciones
            </Heading>
            {certificationsCards}
         </VStack>

         <Divider />
         <VStack w='full' alignItems='flex-start'>
            <Heading fontSize={{ base: 'lg', '2xl': 'xl' }}>
               Mis soft skills
            </Heading>
            {softskillsCards}
         </VStack>
      </VStack>
   );
};

export default Body;
