import validator from 'validator';




// Utilizado en los formularios de registro
export const isRegisterFormValid = ({
   name,
   username,
   password,
   confirmPassword,
   age = null,
   location = null,
}) => {

   if(age && (parseInt(age) < 16 || parseInt(age) > 90)) {
      return {
         isValid: false,
         msg: 'Ingresa una edad válida'
      };
   }

   if (!validator.isAlphanumeric(username)) {
      return {
         isValid: false,
         msg: 'Utiliza solo caracteres alfanuméricos en tu nombre de usuario'
      };
   }

   if (!validator.isStrongPassword(password)) {
      return {
         isValid: false,
         msg: 'Proporciona una contraseña lo suficientemente segura'
      };
   }

   if(password !== confirmPassword) {
      return {
         isValid: false,
         msg: 'Las contraseñas no coinciden'
      }
   }

   if (location && validator.isEmpty(location)) {
      return {
         isValid: false,
         msg: 'Ingresa una localización válida'
      };
   }

   return {
      isValid: true
   };
};
