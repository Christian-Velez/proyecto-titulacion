import {
   extendTheme,
   withDefaultColorScheme,
   withDefaultProps,
} from '@chakra-ui/react';

import '@fontsource/roboto';


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

const blue = {
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

const black = {
   50: '#CBD5E0',
   100: '#A0AEC0',
   200: '#718096',
   300: '#4A5568',
   400: '#2D3748',
   500: '#171923',
   600: '#12131b',
   700: '#0b0c12',
   800: '#030405'
};

const purple = {
   50: '#fdeff6',
   100: '#ed64a6',
   200: '#cb558e',
   300: '#b24b7d',
   400: '#9e436f',
   500: '#8f3c64',
   600: '#81365a',
   700: '#753252',
   800: '#6b2d4b',
   900: '#612944'
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
   }
   ),
   {
      colors: {
         brand: black,
         brandPrimary: blue,
         brandPrimaryPurple: purple
      },
      shadows: {
         outline: '0 0 0 2px var(--chakra-colors-brandPrimary-200)',
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
