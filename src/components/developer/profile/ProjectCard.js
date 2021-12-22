import React from 'react';
import PropTypes from 'prop-types';
import { HStack, Text, VStack, Link } from '@chakra-ui/react';
import IconImg from 'components/IconImg';

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
            maxWidth='50%'
         >
            <Text fontWeight='black'> { title } </Text>
            {
               linkDemo && <Link isExternal href={linkDemo}> Demo </Link>
            }
            {
               linkGH && <Link isExternal href={linkGH}> Github </Link>

            }
            
            
         </VStack>

      </HStack>
   );
};

ProjectCard.propTypes = {
   project: PropTypes.object
};

export default ProjectCard;
