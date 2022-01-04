import { Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Buttons = ({
   isLoading = false,
   cancelRoute,
   actionText,
}) => {
   const navigate = useNavigate();

   return (
      <HStack
         width='full'
         style={{ marginTop: '70px' }}
      >
         <Button
            width='full'
            size='lg'
            variant='outline'
            onClick={() => navigate(cancelRoute)}
            isDisabled={isLoading}
         >
            Cancelar
         </Button>
         <Button
            isLoading={isLoading}
            width='full'
            size='lg'
            type='submit'
         >
            { actionText }
         </Button>
      </HStack>
   );
};

Buttons.propTypes = {
   isLoading: PropTypes.bool,
   cancelRoute: PropTypes.string,
   actionText: PropTypes.string
};

export default Buttons;
