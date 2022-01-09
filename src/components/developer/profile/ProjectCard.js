import React from 'react';
import PropTypes from 'prop-types';
import { HStack, Heading , VStack, Link } from '@chakra-ui/react';
import IconImg from 'components/IconImg';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const ProjectCard = ({ project }) => {
   const { img, title, linkDemo, linkGH } = project;
   return (
      <HStack 
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
};

ProjectCard.propTypes = {
   project: PropTypes.object
};

export default ProjectCard;
