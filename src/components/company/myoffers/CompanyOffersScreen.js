import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
   Badge,
   Heading,
   Text,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import CompanyJob from './CompanyJob';

const CompanyOffersScreen = () => {
   const { jobs } = useSelector(
      (state) => state.companyInfo
   );


   return (
      <VStack
         padding={{ base: 7, lg: 20 }}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
         minH='100vh'
      >


         <Heading
            fontSize={{ base: '2xl', lg: '3xl' }}
         >
            Mis ofertas
         </Heading>

         <VStack 
            paddingLeft={10}
            alignItems='flex-start'
         >

            <Text>
               <Badge 
                  colorScheme='green'
               >
                  ACTIVA
               </Badge>
               {' '}- Indica que la oferta aparece buscadores y puede seguir recibiendo postulaciones.
            </Text>


            <Text>            
               <Badge 
                  colorScheme='red'
               >
                  ARCHIVADA
               </Badge>
               {' '}- Indica que la oferta no aparece más en los buscadores y no puede seguir recibiendo postulaciones.
            </Text>
         </VStack>
          

         <Accordion 
            defaultIndex={[0]}
            allowMultiple 
            w='full'
         >
               <AccordionItem>
                  <AccordionButton>
                     <AccordionIcon />
                     <Heading 
                        fontSize={{ base: 'xl', lg: '2xl' }} 
                        marginLeft={5}
                     > 
                        Activas 
                     </Heading> 
                        
                  </AccordionButton>
                  <AccordionPanel pb={4}>

                     <VStack spacing={5}>
                        {
                           jobs.filter(job => job.active)
                              .map(activeJob => (
                              <CompanyJob key={activeJob.id} job={activeJob}/>
                           ))
                        }
                     
                     
                     </VStack>
                  </AccordionPanel>
               </AccordionItem>

               <AccordionItem>
                  <AccordionButton>
                     <AccordionIcon />
                     <Heading 
                        fontSize={{ base: 'xl', lg: '2xl' }} 
                        marginLeft={5}> 
                        Archivadas (inactivas)
                     </Heading> 
                        
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                     <VStack spacing={5}>
                        {
                           jobs.filter(job => !job.active)
                              .map(activeJob => (
                              <CompanyJob key={activeJob.id} job={activeJob}/>
                           ))
                        }
                     </VStack>
                  </AccordionPanel>
               </AccordionItem>

         </Accordion>

         
      </VStack>
   );
};

export default CompanyOffersScreen;
