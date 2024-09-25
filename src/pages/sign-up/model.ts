import { SignUpDto } from "@entities/api-gen";
import { createSignUp } from "@entities/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (data: SignUpDto, { rejectWithValue }) => {
    const userData = {
      ...data,
      role: "ROLE_USER"
    }
    return await createSignUp(userData)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState: {
    isLoading: false,
    user: null,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(signUp.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    .addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
    })
    .addCase(signUp.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })
  },
})
