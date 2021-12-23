import { Button, Stack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


const Buttons = ({ isUpdating }) => {
   const navigate = useNavigate();

   return (
      <Stack
         width='full'
         style={{ marginTop: '70px' }}
         direction={{
            base: 'column',
            lg: 'row',
         }}
      >
         <Button
            width='full'
            size='lg'
            variant='outline'
            onClick={() =>
               navigate('/dev/profile')
            }
            isDisabled={isUpdating}
         >
            Cancelar
         </Button>
         <Button
            isLoading={isUpdating}
            width='full'
            size='lg'
            type='submit'
         >
            Guardar
         </Button>
      </Stack>
   );
};




Buttons.propTypes = {
   isUpdating: PropTypes.bool
};


export default Buttons;
