import {
   extendTheme,
   withDefaultColorScheme,
   withDefaultProps,
} from '@chakra-ui/react';

import '@fontsource/inter';


const inputFocusBorderColor = {
   field: {
      _focus: {
        borderColor: "purple.500",
        boxShadow: "purple.500"
      }
    }
}


const theme = extendTheme(
   withDefaultColorScheme({
      colorScheme: 'purple',
      components: ['Button'],
   }),
   withDefaultProps({
      defaultProps: {
        variant: 'filled',
      },
      components: ['Input', 'NumberInput', 'PinInput', 'Select', 'Textarea'],
    }),
   {
      fonts: {
         heading: 'Inter',
         body: 'Inter',
      },
      styles: {
         global: {
            body: {
               color: 'gray.700',
            },
         }
      },
      components: {
         Input: {
            variants: {
               filled: inputFocusBorderColor,
               outline: inputFocusBorderColor
            },
         },
         Select: {
            variants: {
               filled: inputFocusBorderColor,
               outline: inputFocusBorderColor
            },
         },
         Textarea: {
            variants: {
               filled: inputFocusBorderColor.field,
               outline: inputFocusBorderColor.field,
            },
         }
      }
   },

   
);

export default theme;
