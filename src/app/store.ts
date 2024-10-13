import { userImageSlice } from '@features/upload';
import { archiveGameSlice } from '@pages/game/archive';
import { createGameSlice } from '@pages/game/create';
import { archiveGroupSlice } from '@pages/group/archive';
import { createGroupSlice } from '@pages/group/create';
import { updateGroupSlice } from '@pages/group/edit';
import { singleGroupSlice } from '@pages/group/single';
import { logInSlice } from '@pages/log-in';
import { signUpSlice } from '@pages/sign-up'
import { updateUserSlice } from '@pages/user/edit';
import { getUserSlice } from '@pages/user/single';
import { getGroupsByUserSlice } from '@pages/user/single/user-groups-tab';
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
    singleGroup: singleGroupSlice.reducer,
    updateGroup: updateGroupSlice.reducer,
    getGroupsByUser: getGroupsByUserSlice.reducer,
    archiveGames: archiveGameSlice.reducer,
    createGame: createGameSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;