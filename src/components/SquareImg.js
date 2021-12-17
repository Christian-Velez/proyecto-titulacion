import { Flex } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';


const SquareImg = ({ src, alt, boxSize }) => {
   const { base, lg } = boxSize;

   return (
      <Flex
         width={{
            base,
            lg,
         }}
         height={{
            base,
            lg,
         }}
         backgroundImage={`url(${src})`}
         title={`${alt} image`}
         backgroundSize='cover'
         backgroundRepeat='no-repeat'
         backgroundPosition='center'
      ></Flex>
   );
};


SquareImg.propTypes = {
   src: PropTypes.string.isRequired,
   alt: PropTypes.string.isRequired,
   boxSize: PropTypes.object
};



export default SquareImg;
