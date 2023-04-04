import { Box, Text } from '@chakra-ui/react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box w='100%' py={2} px={4} textAlign={{ base: 'center', md: 'right' }} fontSize='xs'>
      <Text>&copy; 2023{currentYear !== 2023 && ` - ${currentYear}`} Design & Coding by ツキノリュウ.</Text>
    </Box>
  )
}