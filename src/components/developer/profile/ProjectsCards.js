import React from 'react';
import { HStack, Heading , VStack, Link } from '@chakra-ui/react';
import IconImg from 'components/IconImg';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import EmptySection from './EmptySection';

const ProjectsCards = () => {
   const { projects } = useSelector(state => state.devInfo);

   return (
      projects.length === 0
      ? <EmptySection />
      : projects.map(project => {
         const { img, title, linkDemo, linkGH, _id } = project;

         return (
            <HStack
               key={_id} 
               p={5} 
               alignItems='center'
               w='full'
               spacing={8}
            >
               <IconImg
                  src={ img }
                  boxSize={{ 
                     base: '80px',
                     lg: '100px'
                  }}
                  alt={ title }
               />
               <VStack
                  alignItems='flex-start'
                  maxWidth='80%'
               >
                  <Heading fontSize={{ base: 'md', '2xl': 'lg' }}> { title } </Heading>
                  {
                     linkDemo && <Link isExternal href={linkDemo}> Demo <ExternalLinkIcon mx='2px' /> </Link>
                  }
                  {
                     linkGH && <Link isExternal href={linkGH}> Github <ExternalLinkIcon mx='2px' /> </Link>
                  }
               </VStack>
             </HStack>
         );
      })
      
   );
};

export default ProjectsCards;
