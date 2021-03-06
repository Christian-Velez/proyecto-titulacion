
import React from 'react';
import {
   Heading,
   useBreakpointValue,
} from '@chakra-ui/react';
import './animatedText.css';


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
                        Encuentra el
                     </Heading>
                     <Heading
                        fontSize='6xl'
                        className='process-step-title-overlay'
                     >
                        Encuentra el
                     </Heading>
                  </div>
               </div>
               <div className='process-step-container process-step-2'>
                  <div className='process-step-title-container'>
                     <Heading
                        fontSize='6xl'
                        className='process-step-title'
                     >
                        Trabajo de tus sueños
                     </Heading>
                     <Heading
                        fontSize='6xl'
                        className='process-step-title-overlay'
                     >
                        Trabajo de tus sueños
                     </Heading>
                  </div>
               </div>
            </div>
         </div>
      </section>
   ) : (
      <Heading fontSize='6xl'>
         Encuentra el <br />
         Trabajo de tus sueños
      </Heading>
   );
};

export default AnimatedText;
