import { useState } from 'react';
import { useForm } from './useForm';

export const useTechnologyForm = (initialSelectedType = '') => {
   // Selected
   const [formValues, handleInputChange,, setFormValues] =
      useForm({
         name: '',
         description: '',
         type: initialSelectedType,
      });

   const [img, setImg] = useState(null);
   const [categories, setCategories] = useState();
   const [relatedTechs, setRelatedTechs] =
      useState([]);

   return [
      formValues,
      handleInputChange,
      img,
      setImg,
      categories,
      setCategories,
      relatedTechs,
      setRelatedTechs,
      setFormValues
   ];
};
