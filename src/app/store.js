import { configureStore } from '@reduxjs/toolkit'

import feedingReducer from '../features/actions/feedingSlice'
import showerReducer from '../features/actions/showerSlice'
import cleaningReducer from '../features/actions/cleaningSlice'

export default configureStore({
    reducer: {
        feedings: feedingReducer,
        showers: showerReducer,
        cleanings: cleaningReducer
    },
})
