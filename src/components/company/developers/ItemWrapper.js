import React from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@chakra-ui/react';

const ItemWrapper = ({ children }) => {
   return (
      <Stack
         direction={{
            base: 'column',
            xl: 'row',
         }}
         alignItems='center'
         justifyContent='flex-start'
         padding={{ base: 5, xl: 10 }}
         border='1px solid'
         borderColor='gray.100'
         spacing={10}
         borderRadius='md'
         w='full'
      >
         { children }
      </Stack>
   );
};

ItemWrapper.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
   ])
};

export default ItemWrapper;
