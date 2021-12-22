import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormLabel } from '@chakra-ui/react';
import ProjectDisplay from './displays/ProjectDisplay';

const Projects = ({ projects, setProjects }) => {

   const projectsDisplays = projects.map(pr => <ProjectDisplay key={pr._id} project={pr} setProjects={setProjects}/>);


   return (
      <FormControl>
         <FormLabel fontSize='lg'>Proyectos</FormLabel>
         { projectsDisplays }
         <Button
            size='md'
            variant='outline'
         > Agregar </Button>
      </FormControl>
   );
};

Projects.propTypes = {
   projects: PropTypes.array,
   setProjects: PropTypes.func
};

export default Projects;
