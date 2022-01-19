import { Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Buttons = ({
   cancelRoute,
   actionText,
}) => {
   const { loading } = useSelector(state => state.ui);
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
            isDisabled={loading}
         >
            Cancelar
         </Button>
         <Button
            isLoading={loading}
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
   cancelRoute: PropTypes.string,
   actionText: PropTypes.string
};

export default Buttons;
