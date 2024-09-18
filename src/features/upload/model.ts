import { addImageToUser } from '@entities/user';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const uploadUserImage = createAsyncThunk(
  'user/uploadImage',
  async ({ userId, file }: { userId: string; file: File }, { rejectWithValue }) => {
    return await addImageToUser({ userId, data: file })
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const userImageSlice = createSlice({
  name: 'userImage',
  initialState: {
    loading: false,
    error: null as string | null,
    success: false,
  },
  reducers: {
    resetUploadState(state) {
      state.loading = false
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadUserImage.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(uploadUserImage.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addCase(uploadUserImage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload || 'Ошибка загрузки'
      })
  },
})
