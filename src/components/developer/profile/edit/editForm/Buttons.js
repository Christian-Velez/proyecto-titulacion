import { Button, Stack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Buttons = () => {
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
         >
            Cancelar
         </Button>
         <Button
            width='full'
            size='lg'
            type='submit'
         >
            Guardar
         </Button>
      </Stack>
   );
};

export default Buttons;
