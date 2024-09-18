import { LogInDto } from "@entities/api-gen";
import { createLogIn } from "@entities/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (data: LogInDto, { rejectWithValue }) => {
    return await createLogIn(data)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const logInSlice = createSlice({
  name: 'logIn',
  initialState: {
    isLoading: false,
    user: null,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(logIn.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    .addCase(logIn.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
    })
    .addCase(logIn.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })
  },
})
