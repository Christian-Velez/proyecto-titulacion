import { Text, VStack } from '@chakra-ui/react'
import React from 'react'

const SideBar = () => {
   return (
      <VStack
         pos='sticky'
         left={0}
         top={0}
         h='100vh'
         w='200px'
         backgroundColor='purple.500'
      >
         <Text color='red'> Yo </Text>

      </VStack>
   )
}

export default SideBar
