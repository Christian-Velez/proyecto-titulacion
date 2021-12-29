import React from 'react';
import PropTypes from 'prop-types';
import {
   FormControl,
   FormHelperText,
   FormLabel,
   Input,
} from '@chakra-ui/react';

const ProfilePhoto = ({ setProfilePhoto }) => {
   return (
      <FormControl>
         <FormLabel fontSize='lg'>
            Foto de perfil
         </FormLabel>
         <Input
            type='file'
            id='img'
            accept='image/png, image/jpeg, .svg'
            onChange={(e) => {
               setProfilePhoto(
                  e.target.files[0]
               );
            }}
         />
         <FormHelperText>
            Si no adjuntas ninguna imagen, se mantendrá la anterior
         </FormHelperText>
      </FormControl>
   );
};




ProfilePhoto.propTypes = {
   setProfilePhoto: PropTypes.func
};


export default ProfilePhoto;
