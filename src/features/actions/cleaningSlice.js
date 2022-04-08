import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
    {
        id: 1,
        hour: 6,
        minute: 30
    },

]

const cleaningSlice = createSlice({

    name: 'cleanings',
    initialState,
    reducers: {
        cleaningAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(hour, minute) {
                return {
                    payload: {
                        id: nanoid(),
                        hour,
                        minute
                    }
                }
            }
        },

        cleaningRemoved: {
            reducer(state, action) {
                let id = action.payload.id
                const existingItem = state.find(item => item.id === id)
                if (existingItem) {
                    return state.filter(item => item.id !== id)
                }
            },
            prepare(id) {
                return {
                    payload: {
                        id
                    }
                }
            }
        }
    }

})

export const { cleaningAdded, cleaningRemoved } = cleaningSlice.actions
export const selectAllCleaning = state => state.cleanings

export default cleaningSlice.reducer