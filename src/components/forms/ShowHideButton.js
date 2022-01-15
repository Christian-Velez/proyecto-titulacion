import React from 'react';
import PropTypes from 'prop-types';
import {
   IconButton,
   InputRightElement,
} from '@chakra-ui/react';
import {
   ViewIcon,
   ViewOffIcon,
} from '@chakra-ui/icons';



const ShowHideButton = ({ show, setShow }) => {
   return (
      <InputRightElement
         width='4.5rem'
         marginTop='.25rem'
      >
         <IconButton
            aria-label='Show/Hide'
            h='2rem'
            size='sm'
            icon={
               show ? (
                  <ViewOffIcon />
               ) : (
                  <ViewIcon />
               )
            }
            onClick={() => setShow(!show)}
            variant='ghost'
         />
      </InputRightElement>
   );
};

ShowHideButton.propTypes = {
   show: PropTypes.bool,
   setShow: PropTypes.func
};

export default ShowHideButton;
