import { configureStore } from '@reduxjs/toolkit';
import userDetail from './Slices/UserDetail.js'
export const userStore=configureStore({
    reducer:{
     userDetail: userDetail,
    },
})
