import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormLabel } from '@chakra-ui/react';
import EducationDisplay from './displays/EducationDisplay';

const Education = ({ education, setEducation }) => {

   const educationDisplays = education.map(ed => <EducationDisplay key={ed._id} education={ed} setEducation={setEducation}/>);

   return (
      <FormControl>
                  <FormLabel fontSize='lg'>Educación</FormLabel>
                  { educationDisplays }
                  <Button
                     size='md'
                     variant='outline'
                  > Agregar </Button>
               </FormControl>
   );
};

Education.propTypes = {
   education: PropTypes.array,
   setEducation: PropTypes.func
};

export default Education;
