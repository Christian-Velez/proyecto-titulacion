import { useState } from 'react';

//Custom hook para formularios
export const useForm = (initialState = {}) => {
   //initialState: objeto con los campos del form; id, desc, etc.

   const [formValues, setFormValues] =
      useState(initialState);

   const resetForm = () => {
      setFormValues(initialState);
   };

   //target: desestructuracion del evento 'e'
   const handleInputChange = ({ target }) => {
      // console.log(target.name);
      // console.log(target.value);
      setFormValues({
         ...formValues,
         [target.name]: target.value, //name: value
      });
   };

   //handleInputChage: funcion para incluir en un input con el evento onChange

   return [
      formValues,
      handleInputChange,
      resetForm,
   ];
};
