


import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Select as SpecialSelect } from 'chakra-react-select';
import { useSelector } from 'react-redux';
import { formatSoftskills } from 'helpers/formatSoftskills';

const Softskills = ({selectedSofts, setSelectedSofts })=> {
   const { softskills: allSofts } = useSelector(state => state.soft);
   const softskills = formatSoftskills(allSofts);


   return (
      <FormControl>
         <FormControl>
            <FormLabel fontSize='lg'>Mis soft skills</FormLabel>
            <SpecialSelect
               isMulti
               name='mySoftskills'
               placeholder='Seleccione las soft skills...'
               closeMenuOnSelect={false}
               selectedOptionStyle='check'
               hideSelectedOptions={false}
               options={softskills}
               value={selectedSofts}
               onChange={ setSelectedSofts }
            />
         </FormControl>  
      </FormControl>
   );
};

Softskills.propTypes = {
   selectedSofts: PropTypes.array,
   setSelectedSofts: PropTypes.func
};

export default Softskills;