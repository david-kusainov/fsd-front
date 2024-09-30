import { createGroup } from "@entities/group";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createGroups = createAsyncThunk(
  'group/createGroup',
  async (args: {userId: number, data: FormData }, { rejectWithValue }) => {
    return await createGroup(args)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const createGroupSlice = createSlice({
  name: 'createGroup',
  initialState: {
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGroups.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createGroups.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(createGroups.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  }
})