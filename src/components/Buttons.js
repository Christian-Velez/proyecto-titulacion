import { Button, HStack} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


const Buttons = ({ isLoading, cancelRoute }) => {
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
            onClick={() =>
               navigate(cancelRoute)
            }
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
            Guardar
         </Button>
      </HStack>
   );
};




Buttons.propTypes = {
   isLoading: PropTypes.bool,
   cancelRoute: PropTypes.string
};


export default Buttons;
