

import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heading, HStack } from '@chakra-ui/react';
import IconImg from 'components/layout/IconImg';
import { setIsConversationSelected, setSelectedConversation } from 'actions/conversations';

const ConversationItem = ({ conversation }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   
   const { id : myId } = useSelector(state => state.auth);
   const { members, id } = conversation;
   const member = members.find(item => item.id !== myId);


   const handleOpenConversation = () => {
      dispatch(setSelectedConversation(id));
      dispatch(setIsConversationSelected(true));
      
      navigate(`./id/${id}`);
   }

   return (
      <HStack
         w='full'
         alignItems='center'
         paddingX={3}
         paddingY={5}
         spacing={5}
         cursor='pointer'
         _hover={{
            backgroundColor:
               'var(--chakra-colors-gray-50)',
         }}
         transition='ease .5s'
         onClick={handleOpenConversation}
      >
         <IconImg
            src={member.img}
            alt={member.name}
            boxSize={{ base: '60px' }}
            isRounded
         />

      
         <Heading
            fontSize='lg'
            maxW='60%'
            isTruncated
         >
            { member.name }
         </Heading>
            
      </HStack>
   );
}

ConversationItem.propTypes = {
   conversation: PropTypes.object
}

export default ConversationItem