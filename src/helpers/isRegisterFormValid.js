import validator from 'validator';




// Utilizado en los formularios de registro
export const isRegisterFormValid = ({
   name,
   username,
   password,
   confirmPassword,
   location = null,
}) => {
   let regExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;

   if (!regExp.test(name)) {
      return {
         isValid: false,
         msg: 'Utiliza solo letras y espacios en tu nombre'
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
