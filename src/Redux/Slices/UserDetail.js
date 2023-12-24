import { createSlice } from "@reduxjs/toolkit";
const initialState={
    value:'',
}
export const userDetail=createSlice({
    name:"userDetail",
    initialState,
    reducers:{
      
        fetchData:(state,action)=>{
            state.value=action.payload;
        },
    }
})
export const {fetchData}= userDetail.actions;
export default userDetail.reducer;
