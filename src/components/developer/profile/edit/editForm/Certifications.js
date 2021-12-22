

import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormLabel } from '@chakra-ui/react';
import CertificationDisplay from './displays/CertificationDisplay';

const Certifications = ({ certifications, setCertifications }) => {

   const certificationDisplays = certifications.map(cer => <CertificationDisplay key={cer._id} certification={cer} setCertifications={setCertifications}/>);
   

   return (
      
      <FormControl>
      <FormLabel fontSize='lg'>Licencias y certificaciones</FormLabel>
      { certificationDisplays }
      <Button
         size='md'
         variant='outline'
      > Agregar </Button>
   </FormControl>
   );
};

Certifications.propTypes = {
   certifications: PropTypes.array,
   setCertifications: PropTypes.func
};

export default Certifications;
