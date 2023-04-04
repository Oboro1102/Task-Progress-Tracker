import { Box, Flex, Text, Heading } from '@chakra-ui/react'
import { TaskList } from "./components/TaskList";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { TaskAdditory } from "./components/TaskAdditory";

function App() {
  return (
    <>
      <Box w='100%' minH='calc(100vh - 34px)' p={4}>
        <Heading as='h1' size='xl' pb={4} px={3}>
          <Flex align='flex-end' justify='space-between'>
            <Text>任務清單</Text>
            <TaskAdditory useFor='main' />
          </Flex>
        </Heading>
        <TaskList />
      </Box>
      <ScrollToTop />
      <Footer />
    </>
  )
}

export default App