import { Flex } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

const IconImg = ({
   src,
   alt,
   isRounded = false,
   boxSize,
   bgColor,
   border = false,
}) => {
   const { base, lg, xl } = boxSize;

   return (
      <Flex
         width={{
            base,
            lg,
            xl,
         }}
         height={{
            base,
            lg,
            xl,
         }}
         borderRadius={isRounded ? 'full' : '0'}
         bgColor={bgColor}
         backgroundImage={`url(${src})`}
         title={`${alt} image`}
         backgroundSize='cover'
         backgroundRepeat='no-repeat'
         backgroundPosition='center'
         border={border && '1px solid'}
         borderColor={border && 'gray.300'}
      ></Flex>
   );
};

IconImg.propTypes = {
   src: PropTypes.string.isRequired,
   alt: PropTypes.string.isRequired,
   bgColor: PropTypes.string,
   isRounded: PropTypes.bool,
   boxSize: PropTypes.object.isRequired,
   border: PropTypes.bool,
};

export default IconImg;
