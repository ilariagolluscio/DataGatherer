import {createSlice} from "@reduxjs/toolkit";




export const gallerySlice = createSlice({
    name: 'gallery',
    initialState: {
        selected: {}
    },
    reducers: {
        singleSelect: (state, action) => {
            state.selected[action.payload] = true
        },
    }
})

export const {
    singleSelect
}
    = gallerySlice.actions


export const selectedSelector = (state) => state.selected

export const galleryReducer = gallerySlice.reducer
