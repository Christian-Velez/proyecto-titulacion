import React from 'react';
import {
   Link,
   Navigate,
   useParams,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingScreen from 'components/LoadingScreen';
import { findTechnologyByName } from 'helpers/findTechnology';
import {
   Flex,
   Heading,
   HStack,
   List,
   ListIcon,
   ListItem,
   Text,
   VStack,
} from '@chakra-ui/react';
import IconImg from 'components/IconImg';
import { MdCheckCircle, MdOutlineDescription } from 'react-icons/md';
import TechnologyMainInfo from './TechnologyMainInfo';
import InfoSection from './InfoSection';
import { GiComputing } from 'react-icons/gi';
import { GoTerminal } from 'react-icons/go';


const TechnologyScreen = () => {

   window.scrollTo(0, 0);

   const { technologies } = useSelector(
      (state) => state.tech
   );
   const { name } = useParams();
   let technology = {};

   if (technologies.length > 0) {
      technology = findTechnologyByName(
         technologies,
         name
      );
      if (!technology) {
         return (
            <Navigate to='/dev/technologies' />
         );
      }
   }

   console.log(technology);
   return technologies.length === 0 
      ? <LoadingScreen />
      : 
      <VStack
         padding={{ base: 10, lg: 30, xl: 40 }}
         paddingX={{ xl: 60 }}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
      >
         <TechnologyMainInfo technology={technology} />




         <Flex w='full' flexWrap='wrap' justifyContent='space-between' >
            <InfoSection icon={GoTerminal}>
                  <Heading fontSize='2xl'> Popularidad </Heading>
                  <Text>
                     Solicitada { technology.timesRequested }
                     {
                        technology.timesRequested === 1
                        ? ' vez '
                        : ' veces '
                     }
                     en las ofertas de la plataforma.
                  </Text>

            </InfoSection>


            <InfoSection icon={MdOutlineDescription}>
                  <Heading fontSize='2xl'> Descripción </Heading>
                  <Text> {technology.description} </Text> 
            </InfoSection>


            <InfoSection icon={GiComputing}>
                  <Heading fontSize='2xl'> Categorías</Heading>
                  <List>
                     {
                        technology.categories.map((cat, i) => (
                           <ListItem key={i}>
                              <ListIcon as={MdCheckCircle} />
                                 {cat }.
                           </ListItem>
                        ))
                     }
                  </List>
            </InfoSection>

            <InfoSection icon={GiComputing}>
                  <Heading fontSize='2xl'>Relacionadas</Heading>
                  <VStack spacing={{ base: 3}} alignItems='flex-start'>
                     {
                        technology.relatedTechs.map(tech => (
                           <Link to={`/dev/technologies/${tech.name}`} key={tech.id}>
                              <HStack>
                                 <IconImg src={tech.img} alt={tech.name} boxSize={{ base: 5}}/>
                                 <Text> { tech.name }.</Text>
                              </HStack>

                           </Link>

                        ))
                     }
                  </VStack>
            </InfoSection>


         


           

         </Flex>

      </VStack>;
};

TechnologyScreen.propTypes = {};

export default TechnologyScreen;
