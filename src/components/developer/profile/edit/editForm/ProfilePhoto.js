import {
   FormControl,
   FormHelperText,
   FormLabel,
   Input,
} from '@chakra-ui/react';
import React from 'react';

const ProfilePhoto = () => {
   return (
      <FormControl>
         <FormLabel fontSize='lg'>
            Foto de perfil
         </FormLabel>
         <Input
            type='file'
            id='img'
            accept='image/png, image/jpeg, .svg'
         />
         <FormHelperText>
            {' '}
            Si no adjuntas ninguna imagen, te
            quedarás con la anterior{' '}
         </FormHelperText>
      </FormControl>
   );
};

export default ProfilePhoto;
