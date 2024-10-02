import { userImageSlice } from '@features/upload';
import { archiveGroupSlice } from '@pages/group/archive';
import { createGroupSlice } from '@pages/group/create';
import { getGroupByIdSlice } from '@pages/group/single';
import { logInSlice } from '@pages/log-in';
import { signUpSlice } from '@pages/sign-up'
import { updateUserSlice } from '@pages/user/edit';
import { getUserSlice } from '@pages/user/single';
import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '@widgets/provider';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    signUp: signUpSlice.reducer,
    logIn: logInSlice.reducer,
    getUser: getUserSlice.reducer,
    updateUser: updateUserSlice.reducer,
    userImage: userImageSlice.reducer,
    archiveGroups: archiveGroupSlice.reducer,
    createGroup: createGroupSlice.reducer,
    singleGroup: getGroupByIdSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;