import React from 'react';
import { HStack, Heading , VStack, Link } from '@chakra-ui/react';
import IconImg from 'components/layout/IconImg';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import EmptySection from './EmptySection';


import PropTypes from 'prop-types';




const ProjectsCards = ({ devInfo }) => {
   const { projects } = devInfo;

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

ProjectsCards.propTypes = {
   devInfo: PropTypes.object
};

export default ProjectsCards;
