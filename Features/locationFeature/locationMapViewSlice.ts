import { createSlice } from "@reduxjs/toolkit"

type InitialStateTypes = {
  latlang:{latitude:number, longitude:number}
}

const initialState: InitialStateTypes = {
  latlang:{latitude:0, longitude:0}
}
const locationMapViewSlice = createSlice({
  name:'locationmapView',
  initialState,
  reducers:{
    latlangSender(state, action:{payload:{latlang:{latitude:number, longitude:number}}})
    {
      console.log('gggg' )
      state.latlang={...action.payload, latitude:state.latlang.latitude, longitude:state.latlang.longitude}
    },
  }
})

export default locationMapViewSlice.reducer
export const {latlangSender} = locationMapViewSlice.actions