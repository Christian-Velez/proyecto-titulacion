import axios from "axios";
import { toastWarning } from "helpers/ToastAlert";
import { types } from "types/types"
import { getAxiosConfig } from "utils/getAxiosConfig";

const API_URL = process.env.REACT_APP_API_URL;


export const setIsConversationSelected = (value) => {
   return {
      type: types.setIsConversationSelected,
      payload: value
   }
}


export const startLoadingConversations = () => {
   return async(dispatch, getState) => {
      try {

         const { id } = getState().auth;
   
         const URL = API_URL + '/api/conversation/' + id;
         const config = getAxiosConfig();
   
         const { data } = await axios.get(URL, config);
         const { conversations } = data;

         dispatch(setConversations(conversations));

      } catch(err) {
         console.log(err);
      }
   }
}

export const setConversations = (conversations) => {
   return {
      type: types.setConversations,
      payload: conversations
   }
}


export const setSelectedConversation = (id) => {
   return {
      type: types.setSelectedConversation,
      payload: id
   }
}

export const startSettingConversationMessages = (convId) => {
   return async(dispatch) => {
      try {

         const URL = API_URL + '/api/message/' + convId;
         const config = getAxiosConfig();

         const { data } = await axios.get(URL, config);
         const { messages } = data;
         dispatch(setConversationMessages(messages));

      } catch(err) {
         console.log(err);
      }
   }
}

export const setConversationMessages = (messages) => {
   return {
      type: types.setConversationMessages,
      payload: messages
   }
}


export const startSendingMessage = (params) => {
   return async(dispatch) => {
      try {

         const URL = API_URL + '/api/message';
         const config = getAxiosConfig();
         const { data } = await axios.post(URL, params, config);
         const { savedMessage } = data;

         dispatch(addMessage(savedMessage));

      } catch(err) {
         console.log(err);

         if(err.message === 'Request failed with status code 403') {
            dispatch(startLoadingConversations())
               .then(() => {
                  toastWarning('Parece que la conversación fue bloqueada');
               })
         }
      }
   }
}

export const addMessage = (newMessage) => {
   return {
      type: types.addMessage,
      payload: newMessage
   }
}

export const setLastMessage = () => {
   return {
      type: types.setLastMessage
   }
}


export const setSocket = (socket) => {
   return {
      type: types.setSocket,
      payload: socket
   }
}
