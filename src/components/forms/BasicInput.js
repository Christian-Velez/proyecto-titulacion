import {
   FormControl,
   FormHelperText,
   FormLabel,
   Input,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

const BasicInput = ({
   text,
   isRequired = true,
   helperText = null,
   ...rest

}) => {
   return (
      <FormControl isRequired = {isRequired}>
         <FormLabel fontSize='lg'>
            {text}
         </FormLabel>
         <Input {...rest} />

         {
            helperText &&
            <FormHelperText> {helperText} </FormHelperText>     
         }
      </FormControl>
   );
};

BasicInput.propTypes = {
   text: PropTypes.string,
   helperText: PropTypes.string,
   isRequired: PropTypes.bool
};

export default BasicInput;
