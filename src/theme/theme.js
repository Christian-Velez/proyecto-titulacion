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

const blue = {
   50: '#EBF8FF',
   100: '#BEE3F8',
   200: '#90CDF4',
   300: '#63B3ED',
   400: '#4299E1',
   500: '#3182CE',
   //500: '#4299E1',
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
   600: '#000000',
};

//const purple = {

//   50: '#FAF5FF',
//   100: '#E9D8FD',
//   200: '#D6BCFA',
//   300: '#B794F4',
//   400: '#9F7AEA',
//   500: '#805AD5',
//   600: '#6B46C1',
//   700: '#553C9A',
//   800: '#44337A',
//   900: '#322659',
//};


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
