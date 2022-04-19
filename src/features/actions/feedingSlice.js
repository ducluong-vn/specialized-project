import { createSlice, nanoid } from '@reduxjs/toolkit'
import React from 'react'
import ScheduleSection from '../../components/ScheduleSection'

const initialState = [{
    // id: 1,
    // hour: "xx",
    // minute: "xx"
}]



console.log(initialState)

const feedingSlice = createSlice({

    name: 'feedings',
    initialState,
    reducers: {
        feedingAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(id, hour, minute) {
                return {
                    payload: {
                        id,
                        hour,
                        minute
                    }
                }
            }
        },

        feedingRemoved: {
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

export const { feedingAdded, feedingRemoved } = feedingSlice.actions
export const selectAllFeeding = state => state.feedings

export default feedingSlice.reducer