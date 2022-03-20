import React from 'react';
import Slider from 'react-slick';
import {
   Box,
   Flex,
   Image,
} from '@chakra-ui/react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carrousel = () => {
   const settings = {
      className: 'center',
      centerMode: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 1300,
      slidesToShow: 1,
      centerPadding: '30px',
      nextArrow: <></>,
      prevArrow: <></>,
      draggable: false,
      pauseOnHover: false,
   };
   
   return (
      <Flex
         width='33%'
         borderRadius='lg'
         justifyContent='center'
         alignItems='center'
         className='cellphones'
         display={{ base: 'none', xl: 'flex' }}
      >
         <Box w='100%'>
            <Slider {...settings}>
               <Box className='item'>
                  <Image
                     src='/static/iphone12-1.png'
                     alt='iPhone 12 Mockup'
                  />
               </Box>

               <Box className='item'>
                  <Image
                     src='/static/iphone12-2.png'
                     alt='iPhone 12 Mockup'
                  />
               </Box>

               <Box className='item'>
                  <Image
                     src='/static/iphone12-3.png'
                     alt='iPhone 12 Mockup'
                  />
               </Box>
            </Slider>
         </Box>
      </Flex>
   );
};

export default Carrousel;
