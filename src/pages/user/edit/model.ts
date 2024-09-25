import { UpdateUserDto } from "@entities/api-gen";
import { updateUserById } from "@entities/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateUser = createAsyncThunk(
  'user/UpdateUserById',
  async (args: {userId: any, data: UpdateUserDto}, { rejectWithValue }) => {
    return await updateUserById(args)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const updateUserSlice = createSlice({
  name: 'updateUser',
  initialState: {
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(updateUser.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    .addCase(updateUser.fulfilled, (state) => {
      state.isLoading = false
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })
  }
})
