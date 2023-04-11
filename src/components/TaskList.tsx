import { useAppSelector, useAppDispatch } from './../store/hooks';
import { taskList, removeTask, updateDetails, type taskListType } from './../store/modules/taskSlice';
import { Button, Tag, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Checkbox, List, ListItem, Progress, Flex, Box, Text } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { TaskAdditory } from "../components/TaskAdditory";

export const TaskList = () => {
  // state
  const list = useAppSelector(taskList)

  // methods
  const dispatch = useAppDispatch()
  const calculateCompletionRate = (target: number, total: number): number => {
    if (target === 0 || total === 0) {
      return 0;
    } else {
      return Math.round((target / total * 10000) / 100)
    }
  }
  const updateTaskDetailsStatus = (data: {
    parentId: string,
    id: string,
    title: string,
    finish: boolean
  }) => {
    dispatch(updateDetails(data))
  }

  // template
  const taskLists = (list.map((item: taskListType) => (
    <AccordionItem key={item.id}>
      <h3>
        <Flex align='center' px={4} pt={2}>
          <Tag mr={2}>
            <Text color={calculateCompletionRate(item.details.filter(detail => detail.finish === true).length, item.details.length) > 70 ? 'green.300' : (calculateCompletionRate(item.details.filter(detail => detail.finish === true).length, item.details.length) > 40 ? 'yellow' : 'red')}>{calculateCompletionRate(item.details.filter(detail => detail.finish === true).length, item.details.length)}%</Text>
          </Tag>
          <Text mr={2}>{item.title}</Text>
          <TaskAdditory useFor='sub' parentId={item.id} />
          <Button ml={2} size='xs' colorScheme='red' leftIcon={<DeleteIcon />} onClick={() => {
            dispatch(removeTask({
              useFor: 'main',
              id: item.id
            }))
          }}>移除</Button>
        </Flex>
        <AccordionButton>
          <Box as="span" flex='1' pr={2}>
            <Progress hasStripe isAnimated size='sm' borderRadius='full' value={calculateCompletionRate(item.details.filter(detail => detail.finish === true).length, item.details.length)} colorScheme={calculateCompletionRate(item.details.filter(detail => detail.finish === true).length, item.details.length) > 70 ? 'green' : (calculateCompletionRate(item.details.filter(detail => detail.finish === true).length, item.details.length) > 40 ? 'yellow' : 'red')} />
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h3>
      <AccordionPanel pb={4}>
        {
          item.details.length > 0 ? (
            <List spacing={3}>
              {item.details.map((subItem, subIndex) => (
                <ListItem key={subIndex}>
                  <Flex align='center'>
                    <Checkbox mr={2} colorScheme='green' isChecked={subItem.finish} onChange={(e) => {
                      updateTaskDetailsStatus({
                        parentId: item.id,
                        id: subItem.id,
                        title: subItem.title,
                        finish: e.target.checked
                      })
                    }}>{subItem.title}</Checkbox>
                    <Button size='xs' colorScheme='red' leftIcon={<DeleteIcon />} onClick={() => {
                      dispatch(removeTask({
                        useFor: 'sub',
                        parentId: item.id,
                        id: subItem.id
                      }))
                    }}>移除</Button>
                  </Flex>
                </ListItem>
              ))}
            </List>
          ) : (
            <Box w='100%' color='white' textAlign='center' fontSize='sm'>目前無子任務</Box>
          )
        }
      </AccordionPanel>
    </AccordionItem>
  ))
  )

  return list.length > 0 ? (
    <Accordion allowToggle defaultIndex={0}>{taskLists}</Accordion>
  ) : (
    <Box w='100%' color='white' textAlign='center' fontSize='sm'>目前無追蹤任務</Box>
  )
}