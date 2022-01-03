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
   helperText = null,
   ...rest

}) => {
   return (
      <FormControl isRequired>
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
};

export default BasicInput;
