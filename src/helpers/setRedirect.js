


export const setRedirect = (userKind) => {
   if (userKind === 'Admin') {
      return '/admin';
   }
   if (userKind === 'Developer') {
      return '/dev';
   }
   if (userKind === 'Company') {
      return '/co';
   }
};