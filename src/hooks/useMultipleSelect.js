
/* eslint-disable */
import { useRef, useState } from 'react';

export const useMultipleSelect = (allOptions = []) => {
   const itemRef = useRef();
   const [selectedOptions] = useState([]);
   const [remainOptions, setRemainOptions ] = useState(allOptions);



   const handleSelectNewOption = (selectedOpt) => {

      setRemainOptions(actualOpt => actualOpt.filter((opt) => opt !== selectedOpt))


   }



   return {
      itemRef,
      selectedOptions,
      remainOptions,
      setRemainOptions,
      handleSelectNewOption,
   };


};
