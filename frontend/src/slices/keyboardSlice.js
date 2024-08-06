import {createSlice} from "@reduxjs/toolkit";




export const keyboardSlice = createSlice({
    name: 'gallery',
    initialState: {
        keySet: false
    },
    reducers: {
        enableKeySet: (state) => {
            state.keySet = true
        },
        disableKeySet: (state) => {
            state.keySet = false
        },
        toggleKeySet: (state) => {
            state.keySet = !state.keySet
        },
    }
})

export const {
    enableKeySet,
    disableKeySet,
    toggleKeySet
}
    = keyboardSlice.actions

export const keySetSelector = (state) => state.keyboard.keySet

export const keyboardReducer = keyboardSlice.reducer
