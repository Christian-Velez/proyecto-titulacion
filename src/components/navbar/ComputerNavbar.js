import React, { useEffect, useState } from 'react';
import LinkItem from './LinkItem';
import {
   Divider,
   Heading,
   HStack,
   Icon,
   Text,
   VStack,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import {
   generalLogout,
   setIsChecking,
} from 'actions/auth';
import PropTypes from 'prop-types';
import IconImg from 'components/IconImg';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const ComputerNavbar = ({ userLinks }) => {
   const navigate = useNavigate();
   const location = useLocation();
   

   const [userInfo, setUserInfo] = useState({});
   const { name, img, kind } = userInfo;

   const devInfo = useSelector(state => state.devInfo);
   const companyInfo = useSelector(state => state.companyInfo);
   const { redirect } = useSelector(state => state.auth);


   useEffect(() => {
      if(devInfo.name && devInfo.img && devInfo.kind) {
         const { name, img, kind } = devInfo;
         setUserInfo({
            name,
            img,
            kind
         });
      }
      else if(companyInfo.name && companyInfo.img && companyInfo.kind) {
         const { name, img, kind } = companyInfo;
         setUserInfo({
            name,
            img,
            kind
         });
      }
   }, []);
  

   const isProfileActive = location.pathname === `${redirect}/profile`;


   const dispatch = useDispatch();
   const handleLogout = () => {
      dispatch(generalLogout());
      dispatch(setIsChecking(false));
   };

   return (
      <VStack
         h='100vh'
         w='250px'
         pl={3}
         display={{ base: 'none', lg: 'flex' }}
         alignItems='flex-start'
         paddingY={6}
         overflowY='auto'
      >
         {/*Logotipo de la pagina */}
         <HStack
            width='full'
            paddingLeft={5}
            paddingY={5}
         >
            <IconImg
               alt='Logo'
               src='/static/logo.png'
               boxSize={{ base: '30px' }}
            />
            <Heading fontSize='2xl' color='white'>
               devconnect
            </Heading>
         </HStack>

         <Divider />

         {/*Links que dependen del tipo de cuenta*/}
         {userLinks.map((link) => {
            const { index, path, name, icon } =
               link;

            return (
               <LinkItem
                  key={index}
                  icon={icon}
                  path={path}
               >
                  {name}
               </LinkItem>
            );
         })}

         <VStack
            width='full'
            style={{
               margin: 0,
               marginTop: 'auto',
               marginBottom: '50px',
            }}
         >
            {(img && name && kind) && 
            (
               <HStack
                  padding={3}
                  marginBottom={5}
                  color='brand.100'
                  alignItems='flex-start'
                  w='full'
                  _hover={{
                     bgColor: 'brand.600',
                  }}
                  transition='background-color .3s ease'
                  as='button'
                  onClick={ () => {navigate(`${redirect}/profile`); }}

                  borderLeft={ isProfileActive && '3px solid' }
                  bgColor={ isProfileActive && 'brand.400'}
               >
                  <IconImg
                     src={img}
                     alt={name}
                     boxSize={{ base: 10 }}
                  />

                  <VStack
                     alignItems='flex-start'
                     spacing={0}
                  >
                     <Text fontSize='md'>
                        {name}
                     </Text>
                     <Text fontSize='xs'>
                        {  
                           kind === 'Developer' ? 'PROGRAMADOR' : 
                           kind === 'Company'   ? 'EMPRESA' :
                                    ''
                        }
                        
                     </Text>
                  </VStack>
               </HStack>
            )}

            <HStack
               color={'brand.100'}
               w='full'
               as='button'
               onClick={handleLogout}
               _hover={{
                  bgColor: 'brand.600',
               }}
               transition='background-color .3s ease'
               paddingY={3}
               paddingX={5}
            >
               <Icon as={FiLogOut} h={5} w={5} />
               <Text fontSize='lg'>
                  Cerrar sesión
               </Text>
            </HStack>
         </VStack>
      </VStack>
   );
};

ComputerNavbar.propTypes = {
   userLinks: PropTypes.array,
};

export default ComputerNavbar;
