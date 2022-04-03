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

const CurriculumSection = ({
   devInfo,
   curriculum,
   setCurriculum,
}) => {
   const handleOpenFileExplorer = () => {
      document.getElementById('cv-input').click();
   };


   const isNewFileAttached = typeof curriculum === 'object';

   const hasAllRequirements = 
      devInfo.img &&
      devInfo.name &&
      devInfo.location &&
      devInfo.description &&
      devInfo.technologies?.length >= 1 &&
      devInfo.projects?.length >= 1;

   return (
      <>
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
                  { devInfo.curriculum ? 'Adjuntar nuevo' : 'Adjuntar' }
               </Button>

               {
                  isNewFileAttached && <Icon as={AttachmentIcon} />
               }

            </HStack>

            {
               hasAllRequirements
                  ? <FormHelperText marginTop={5}>
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

                  : 
                  <Badge marginTop={5} cursor='pointer'>Información</Badge>
            }
            
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
