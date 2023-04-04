import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..';
import type { PayloadAction } from '@reduxjs/toolkit'

export interface taskListType {
    id: string,
    title: string,
    details: {
        id: string,
        title: string,
        finish: boolean
    }[]
}

const initialState = {
    taskList: [{
        id: '2023-04-03T18:25:50.469Z',
        title: '預設項目一',
        details: [{
            id: '2023-04-04T06:25:36.000Z',
            title: '任務一',
            finish: false
        }, {
            id: '2023-04-04T06:25:54.729Z',
            title: '任務二',
            finish: false
        }]
    }, {
        id: '2023-04-03T18:26:04.086Z',
        title: '預設項目二',
        details: [{
            id: '2023-04-04T06:25:56.073Z',
            title: '任務一',
            finish: false
        }]
    }] as taskListType[],
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        reset() { return initialState },
        addNewTask(state, action: PayloadAction<{
            useFor: string,
            parentId?: string
            id: string,
            title: string,
        }>) {
            const { useFor, parentId, id, title } = action.payload
            if (useFor === 'main') {
                state.taskList.push({ id, title, details: [] })
            } else {
                const parent = state.taskList.findIndex(item => item.id === parentId)
                state.taskList[parent].details.push({ id, title, finish: false })
            }
        },
        removeTask(state, action: PayloadAction<{
            useFor: string,
            parentId?: string
            id: string,
        }>) {
            const { useFor, parentId, id } = action.payload
            if (useFor === 'main') {
                const target = state.taskList.findIndex(item => item.id === id)
                state.taskList.splice(target, 1)
            } else {
                const parent = state.taskList.findIndex(item => item.id === parentId)
                const target = state.taskList[parent].details.findIndex(item => item.id === id)
                state.taskList[parent].details.splice(target, 1)
            }
        },
        updateDetails(state, action: PayloadAction<{
            parentId: string,
            id: string,
            title: string,
            finish: boolean
        }>) {
            const { parentId, id, title, finish } = action.payload
            const updateParent = state.taskList.findIndex(item => item.id === parentId)
            const updateTarget = state.taskList[updateParent].details.findIndex(item => item.id === id)
            Object.assign(state.taskList[updateParent].details[updateTarget], { title, finish })
        }
    },
})

export const { reset, addNewTask, removeTask, updateDetails } = taskSlice.actions
export const taskList = (state: RootState) => state.task.taskList;

export default taskSlice.reducer