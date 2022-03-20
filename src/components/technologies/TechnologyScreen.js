import React from 'react';
import useScrollToTop from 'hooks/useScrollToTop';
import {
   Link,
   Navigate,
   useParams,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import IconImg from 'components/layout/IconImg';
import { MdCheckCircle, MdOutlineDescription } from 'react-icons/md';
import TechnologyMainInfo from './TechnologyMainInfo';
import InfoSection from './InfoSection';
import { GiComputing } from 'react-icons/gi';
import { GoTerminal } from 'react-icons/go';
import Layout from 'components/layout';


const TechnologyScreen = () => {
   useScrollToTop();
   const { redirect } = useSelector(state => state.auth);
   const { technologies } = useSelector(state => state.tech);
   const { name } = useParams();
   const technology = findTechnologyByName(technologies, name);

   return (
      !technology
      ? <Navigate to={`${redirect}/technologies`} />
      : 
      <Layout
         padding={{ base: 10, lg: 30, xl: 40 }}
         paddingX={{ xl: 60 }}
      >
         <TechnologyMainInfo technology={technology} />
         <Flex w='full' flexWrap='wrap' justifyContent='space-between'>
            <InfoSection icon={GoTerminal}>
                  <Heading fontSize={{ base: 'xl', lg: '2xl'}}> Popularidad </Heading>
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
                  <Heading fontSize={{ base: 'xl', lg: '2xl'}}> Descripción </Heading>
                  <Text> {technology.description} </Text> 
            </InfoSection>


            <InfoSection icon={GiComputing}>
                  <Heading fontSize={{ base: 'xl', lg: '2xl'}}> Categorías</Heading>
                  <List>
                     {
                        technology.categories.map((cat, i) => (
                           <ListItem key={i}>
                              <ListIcon as={MdCheckCircle} />
                                 { cat }
                           </ListItem>
                        ))
                     }
                  </List>
            </InfoSection>

            <InfoSection icon={GiComputing}>
                  <Heading fontSize={{ base: 'xl', lg: '2xl'}}>Relacionadas</Heading>
                  <VStack spacing={{ base: 3}} alignItems='flex-start'>
                     {
                        technology.relatedTechs.map(tech => (
                           <Link to={`${redirect}/technologies/${tech.name}`} key={tech.id}>
                              <HStack>
                                 <IconImg src={tech.img} alt={tech.name} boxSize={{ base: 5}}/>
                                 <Text> { tech.name }</Text>
                              </HStack>

                           </Link>

                        ))
                     }
                  </VStack>
            </InfoSection>
         </Flex>

      </Layout>

   );

};

TechnologyScreen.propTypes = {};

export default TechnologyScreen;
