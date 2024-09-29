import { UserInfoDto } from "@entities/api-gen";
import { getUserInfoById, deleteImagesByUser, setAvatarToUser } from "@entities/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
  'user/getUserById',
  async (userId: any, { rejectWithValue }) => {
    return await getUserInfoById(userId)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const deleteImageUser = createAsyncThunk(
  'user/deleteImageUser',
  async ( args: {userId: any, imageId: any}, { rejectWithValue }) => {
    return await deleteImagesByUser(args)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const setAvatarUser = createAsyncThunk(
  'user/setAvatarUser',
  async (args: {userId: any, imageId: any}, { rejectWithValue }) => {
    return await setAvatarToUser(args)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const getUserSlice = createSlice({
  name: 'getUser',
  initialState: {
    isLoading: false,
    user: null as UserInfoDto | null,
    error: null as {error: string} | string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(deleteImageUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteImageUser.fulfilled, (state, action) => {
        state.isLoading = false
        if (state.user) {
          state.user.icon = action.payload
          window.location.reload()
        }
      })
      .addCase(deleteImageUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(setAvatarUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(setAvatarUser.fulfilled, (state, action) => {
        state.isLoading = false
        if (state.user) {
          state.user.icon = action.payload
          window.location.reload()
        }
      })
      .addCase(setAvatarUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  }  
})
