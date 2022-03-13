import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

const defaultPadding = {
   base: 7,
   lg: 20,
};

const Layout = ({
   children,
   padding = defaultPadding,
   spacing = 20,
   alignItems = 'flex-start',
   title,
   w = 'full',
   ...rest
}) => {
   return (
      <VStack
         padding={padding}
         spacing={spacing}
         alignItems={alignItems}
         w={w}
         className='animate__animated animate__fadeIn animate__faster'
         {...rest}
      >
         {
            title && 
            <Heading
               fontSize={{ base: '2xl', lg: '3xl' }}
            >
               { title }
            </Heading>
         }

         {children}
      </VStack>
   );
};

Layout.propTypes = {
   title: PropTypes.string,
   children: PropTypes.any,
   padding: PropTypes.object,
   spacing: PropTypes.number,
   alignItems: PropTypes.string,
   w: PropTypes.string,
};


export default Layout;
