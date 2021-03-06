import React, {
   useEffect,
   useState,
} from 'react';
import PropTypes from 'prop-types';
import {
   FormControl,
   FormLabel,
   IconButton,
   Input,
} from '@chakra-ui/react';
import IconImg from './IconImg';
import { EditIcon } from '@chakra-ui/icons';
import { errorAlert } from 'helpers/SwalAlerts';

const ProfilePhoto = ({
   current,
   setProfilePhoto,
   text,
   isRounded = true,
   isRequired = false
}) => {
   const [currentImg, setCurrentImg] = useState(current);
   


   // Se utiliza en los formularios agregar nueva techn/soft
   if (!currentImg) {
      setCurrentImg('/static/no-img.png');
   }

   useEffect(() => {
      // Crea un URL auxiliar antes de subir la img a cloudinary
      if (
         current &&
         typeof current !== 'string'
      ) {
         setCurrentImg(
            URL.createObjectURL(current)
         );
      }
   }, [current]);

   const handleOpenFileExplorer = () => {
      document.getElementById('img').click();
   };

   const onInvalid = (e) => {
      e.preventDefault();
      errorAlert({ title: 'Adjunta una foto' });
   };

   return (
      <FormControl
         display='flex'
         flexDir='column'
         w='min-content'
         isRequired={isRequired}
      >
         <FormLabel
            fontSize='lg'
            marginBottom={5}
         >
            {text}
         </FormLabel>

         {currentImg && (
            <IconImg
               src={currentImg}
               isRounded={isRounded}
               alt='Profile'
               boxSize={{ base: '200px' }}
            />
         )}
         <Input
            type='file'
            id='img'
            accept='image/png, image/jpeg, .svg'
            onChange={(e) => {
               setProfilePhoto(e.target.files[0]);
            }}
            visibility='hidden'
            onInvalid={onInvalid}
         />

         <IconButton
            icon={<EditIcon />}
            aria-label='Edit profile photo'
            variant='outline'
            w='30px'
            alignSelf='flex-end'
            onClick={handleOpenFileExplorer}
         />
      </FormControl>
   );
};

ProfilePhoto.propTypes = {
   current: PropTypes.any,
   setProfilePhoto: PropTypes.func,
   text: PropTypes.string,
   isRounded: PropTypes.bool,
   isRequired: PropTypes.bool
};

export default ProfilePhoto;
