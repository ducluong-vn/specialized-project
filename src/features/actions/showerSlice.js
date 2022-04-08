import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
    {
        id: 1,
        hour: 10,
        minute: 19
    },

]

const showerSlice = createSlice({

    name: 'showers',
    initialState,
    reducers: {
        showerAdded: {
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

        showerRemoved: {
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

export const { showerAdded, showerRemoved } = showerSlice.actions
export const selectAllShower = state => state.showers

export default showerSlice.reducer