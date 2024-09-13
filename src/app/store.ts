import { logInSlice } from '@pages/log-in';
import { signUpSlice } from '@pages/sign-up'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    signUp: signUpSlice.reducer,
    logIn: logInSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;