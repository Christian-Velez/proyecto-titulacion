import { types } from "types/types";



const initialState = {
   isConversationSelected: false,
   selectedConversation: {},
   conversationMessages: [],
   conversations: [],
   lastMessage: {}
   
}


export const conversationReducer = (state = initialState, action) => {
   switch(action.type) {
      case types.setIsConversationSelected:
         return {
            ...state,
            isConversationSelected: action.payload
         }

      case types.setConversations:
         return {
            ...state,
            conversations: action.payload
         }

      case types.setSelectedConversation:
         return {
            ...state,
            selectedConversation: state.conversations.find(conv => conv.id === action.payload)
         }
         
      case types.setConversationMessages:
         return {
            ...state,
            conversationMessages: action.payload
         }

      case types.addMessage:
         return {
            ...state,
            conversationMessages: [
               ...state.conversationMessages,
               action.payload
            ]
         }

      case types.setLastMessage:
         return {
            ...state,
            lastMessage: state.conversationMessages
         }

      default:
         return state;
   }
}