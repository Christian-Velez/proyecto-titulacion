import React from 'react';
import PropTypes from 'prop-types';
import {
   Badge,
   Button,
   FormControl,
   FormHelperText,
   FormLabel,
   HStack,
   Icon,
   Input,
} from '@chakra-ui/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Curriculum from 'components/developer/pdf/Curriculum';
import { AttachmentIcon } from '@chakra-ui/icons';
import {
   useDisclosure,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   Text,
   ModalCloseButton,
   ModalBody,
   ModalFooter,
   UnorderedList,
   ListItem,
} from '@chakra-ui/react';

const CurriculumSection = ({
   devInfo,
   curriculum,
   setCurriculum,
}) => {
   const { onOpen, isOpen, onClose } =
      useDisclosure();
   const handleOpenFileExplorer = () => {
      document.getElementById('cv-input').click();
   };

   const isNewFileAttached =
      typeof curriculum === 'object';

   const hasAllRequirements =
      devInfo.img &&
      devInfo.name &&
      devInfo.location &&
      devInfo.description &&
      devInfo.technologies?.length >= 1 &&
      devInfo.projects?.length >= 1;

   return (
      <>
         <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>
                  Generar Currículum
               </ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Text>
                     La plataforma te permite
                     generar un currículum en
                     formato PDF con los datos
                     adjuntos a tu perfil. Para
                     esto, debes haber registrado los siguientes datos:
                     <UnorderedList marginY={10}>
                        <ListItem>
                           Foto de perfil
                        </ListItem>
                        <ListItem>
                           Nombre
                        </ListItem>
                        <ListItem>
                           Localización
                        </ListItem>
                        <ListItem>
                           Descripción
                        </ListItem>
                        <ListItem>
                           Al menos una tecnología
                        </ListItem>

                        <ListItem>
                           Al menos un proyecto
                        </ListItem>
                     </UnorderedList>

                     Actualiza tu información, guarda tus datos y regresa aquí para poder aprovechar la funcionalidad.
                  </Text>
               </ModalBody>

               <ModalFooter>
                  <Button
                     colorScheme='brand'
                     mr={3}
                     onClick={onClose}
                  >
                     Ok
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>

         <Input
            type='file'
            id='cv-input'
            accept='.pdf'
            onChange={(e) => {
               setCurriculum(e.target.files[0]);
            }}
            display='none'
         />
         <FormControl>
            <FormLabel fontSize='lg'>
               Currículum
            </FormLabel>

            <HStack spacing={5}>
               <Button
                  onClick={handleOpenFileExplorer}
               >
                  {devInfo.curriculum
                     ? 'Adjuntar nuevo'
                     : 'Adjuntar'}
               </Button>

               {isNewFileAttached && (
                  <Icon as={AttachmentIcon} />
               )}
            </HStack>

            {hasAllRequirements ? (
               <FormHelperText marginTop={5}>
                  ¿No tienes uno?
                  <PDFDownloadLink
                     document={
                        <Curriculum
                           devInfo={devInfo}
                        />
                     }
                     fileName='CV.pdf'
                  >
                     {({
                        blob,
                        url,
                        loading,
                        error,
                     }) =>
                        loading ? (
                           <Badge
                              colorScheme='red'
                              marginLeft={3}
                           >
                              Cargando...
                           </Badge>
                        ) : (
                           <Badge
                              colorScheme='cyan'
                              marginLeft={3}
                           >
                              Generar!
                           </Badge>
                        )
                     }
                  </PDFDownloadLink>
               </FormHelperText>
            ) : (
               <Badge
                  marginTop={5}
                  cursor='pointer'
                  onClick={onOpen}
               >
                  Información
               </Badge>
            )}
         </FormControl>
      </>
   );
};

CurriculumSection.propTypes = {
   devInfo: PropTypes.object,
   curriculum: PropTypes.any,
   setCurriculum: PropTypes.func,
};

export default CurriculumSection;
