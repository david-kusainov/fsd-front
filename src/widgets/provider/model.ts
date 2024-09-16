import { createSlice } from "@reduxjs/toolkit";
import { JwtPayload } from "jwt-decode";

interface UserInfo extends JwtPayload {
  id: number
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as UserInfo | null
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    },
  },
})
