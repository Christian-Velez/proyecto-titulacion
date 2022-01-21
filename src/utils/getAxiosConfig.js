


export const getAxiosConfig = (token) => {
   return {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };
};