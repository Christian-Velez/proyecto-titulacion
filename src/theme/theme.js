import {
   extendTheme,
   withDefaultColorScheme,
   withDefaultProps,
} from '@chakra-ui/react';

import '@fontsource/inter';
import '@fontsource/open-sans';
import '@fontsource/roboto';
import '@fontsource/noto-sans';


const inputFocusBorderColor = {
   field: {
      _focus: {
         borderColor: 'brand.500',
         boxShadow: 'brand.500',
      },
   },
};


const fontFamily = {
   body: 'Roboto',
};

const blueBrandColor = {
   50: '#EBF8FF',
   100: '#BEE3F8',
   200: '#90CDF4',
   300: '#63B3ED',
   400: '#4299E1',
   500: '#3182CE',
   600: '#2B6CB0',
   700: '#2C5282',
   800: '#2A4365',
   900: '#1A365D',
};


const theme = extendTheme(
   withDefaultColorScheme({
      colorScheme: 'brand',
      components: ['Button'],
   }),
   withDefaultProps({
      defaultProps: {
         variant: 'filled',
      },
      components: [
         'Input',
         'NumberInput',
         'PinInput',
         'Select',
         'Textarea',
      ],
   }),
   {
      colors: {
         brand: blueBrandColor,
      },
      fonts: fontFamily,
      styles: {
         global: {
            body: {
               color: 'gray.800',
            },
         },
      },
      components: {
         Input: {
            variants: {
               filled: inputFocusBorderColor,
               outline: inputFocusBorderColor,
            },
         },
         Select: {
            variants: {
               filled: inputFocusBorderColor,
               outline: inputFocusBorderColor,
            },
         },
         Textarea: {
            variants: {
               filled:
                  inputFocusBorderColor.field,
               outline:
                  inputFocusBorderColor.field,
            },
         },
      },
   }
);

export default theme;
