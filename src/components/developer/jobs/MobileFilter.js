import React from 'react';
import PropTypes from 'prop-types';

import {
   Drawer,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
   DrawerBody,
} from '@chakra-ui/react';
import FilterContent from './FilterContent';

const MobileFilter = ({ filtersModal, filters, setFilters}) => {
   const { isOpen, onClose } =
      filtersModal;

   return (
      <Drawer 
         isOpen={isOpen}
         onClose={onClose}
         placement='right'         
      >
         <DrawerOverlay />
         <DrawerContent>
            <DrawerCloseButton />

            <DrawerBody
               padding={10}
            >
               <FilterContent filters={filters} setFilters={setFilters}/>
            </DrawerBody>
         </DrawerContent>
      </Drawer>
   );
};

MobileFilter.propTypes = {
   filtersModal: PropTypes.object,
   filters: PropTypes.object,
   setFilters: PropTypes.func
};

export default MobileFilter;
