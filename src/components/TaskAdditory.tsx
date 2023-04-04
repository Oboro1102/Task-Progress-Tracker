import { useRef, useState } from "react";
import { useAppDispatch } from '../store/hooks';
import { addNewTask } from '../store/modules/taskSlice';
import { useDisclosure, Button, Input, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Box, Text } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export const TaskAdditory = (props: {
    useFor: string
    parentId?: string
}) => {
    // state
    const [newTask, setNewTask] = useState('')

    // methods
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef(null)
    const dispatch = useAppDispatch()
    const addTask = (useFor: string, title: string) => {
        const data = {
            useFor,
            id: new Date().toISOString(),
            title,
        }
        if (useFor === 'sub') {
            Object.assign(data, { parentId: props.parentId })
        }
        dispatch(addNewTask(data))
        setNewTask('')
    }

    return (
        <>
            <Button ref={btnRef} size={props.useFor === 'sub' ? 'xs' : 'sm'} colorScheme='green' leftIcon={<AddIcon />} onClick={onOpen}>
                {props.useFor === 'sub' ? '新增子任務' : '新增任務'}
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{props.useFor === 'sub' ? '新增子任務' : '新增任務'}</DrawerHeader>
                    <DrawerBody>
                        <Input value={newTask} placeholder='請輸入任務名稱' onChange={(e) => { setNewTask(e.target.value) }} />
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>取消</Button>
                        <Button isDisabled={newTask.length <= 0} colorScheme='blue' onClick={() => { addTask(props.useFor, newTask) }}>新增</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer >
        </>
    )
}