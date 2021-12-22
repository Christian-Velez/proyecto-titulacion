import {
   FormControl,
   FormLabel,
   Input,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

const BasicInput = ({ text, name, type = 'text', value, onChange}) => {
   return (
      <FormControl isRequired>
         <FormLabel fontSize='lg'>
            { text }
         </FormLabel>
         <Input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
         />
      </FormControl>
   );
};

BasicInput.propTypes = {
   text: PropTypes.string,
   name: PropTypes.string,
   type: PropTypes.string,
   value: PropTypes.string,
   onChange: PropTypes.func
};



export default BasicInput;
