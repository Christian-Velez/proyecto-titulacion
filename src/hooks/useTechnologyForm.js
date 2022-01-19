import { useState } from 'react';
import { useForm } from './useForm';

export const useTechnologyForm = ({ initialType }) => {
   // Selected
   const [formValues, handleInputChange,, setFormValues] =
      useForm({
         name: '',
         description:'',
         type: initialType,
      });

   const [img, setImg] = useState(null);
   const [categories, setCategories] = useState([]);
   const [relatedTechs, setRelatedTechs] = useState([]);

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
