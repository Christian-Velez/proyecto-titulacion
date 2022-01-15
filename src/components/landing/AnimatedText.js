import {
   Heading,
   useBreakpointValue,
} from '@chakra-ui/react';

import './animatedText.css';
import React from 'react';

const AnimatedText = () => {
   const isAnimated = useBreakpointValue({
      base: true,
      xl: false,
   });

   return isAnimated ? (
      <section className='section-process'>
         <div className='section-container'>
            <div className='process-steps-container container-medium with-padding'>
               <div className='process-step-container process-step-1'>
                  <div className='process-step-title-container'>
                     <Heading
                        fontSize='6xl'
                        className='process-step-title'
                     >
                        Powerful News
                     </Heading>
                     <Heading
                        fontSize='6xl'
                        className='process-step-title-overlay'
                     >
                        Powerful News
                     </Heading>
                  </div>
               </div>
               <div className='process-step-container process-step-2'>
                  <div className='process-step-title-container'>
                     <Heading
                        fontSize='6xl'
                        className='process-step-title'
                     >
                        Explored Feed
                     </Heading>
                     <Heading
                        fontSize='6xl'
                        className='process-step-title-overlay'
                     >
                        Explored Feed
                     </Heading>
                  </div>
               </div>
            </div>
         </div>
      </section>
   ) : (
      <Heading fontSize='6xl'>
         Powerful News Explored Feed
      </Heading>
   );
};

export default AnimatedText;
