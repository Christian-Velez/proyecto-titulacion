

// Aux token lo utilizo en startCheckingIsTokenValid
// cuando todavia no seteo la autenticacion en localStorage


export const getAxiosConfig = (auxToken = null) => {
   let bearerToken;

   if(!auxToken) {
      const auth = localStorage.getItem('auth');
      const { token } = JSON.parse(auth) || '';
      bearerToken = token;
      
   } else {
      bearerToken = auxToken;
   }

   return {
      headers: {
         Authorization: `Bearer ${bearerToken}`,
      },
   };
};