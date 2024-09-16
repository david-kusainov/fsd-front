import { logInSlice } from '@pages/log-in';
import { signUpSlice } from '@pages/sign-up'
import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '@widgets/provider';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    signUp: signUpSlice.reducer,
    logIn: logInSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;