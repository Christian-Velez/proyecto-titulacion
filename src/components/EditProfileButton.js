import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@chakra-ui/react';
import { MdOutlineModeEditOutline } from 'react-icons/md';

const EditProfileButton = ({
   handleEditProfile,
}) => {
   return (
      <IconButton
         aria-label='Edit profile'
         variant='outline'
         fontSize='30px'
         icon={<MdOutlineModeEditOutline />}
         position='absolute'
         top={3}
         right={{ base: 10, lg: 30, xl: 40 }}
         zIndex={1000}
         size='lg'
         onClick={handleEditProfile}
      />
   );
};

EditProfileButton.propTypes = {
   handleEditProfile: PropTypes.func,
};

export default EditProfileButton;
