import { GroupDto } from "@entities/dto";
import { getGroupsByUser } from "@entities/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserGroupsByUserThunk = createAsyncThunk(
  'user/getUserGroupsByUser',
  async(userId: number, { rejectWithValue }) => {
    return await getGroupsByUser(userId)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const getGroupsByUserSlice = createSlice({
  name: 'userGroupsTab',
  initialState: {
    loading: false,
    group: [] as GroupDto[],
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserGroupsByUserThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserGroupsByUserThunk.fulfilled, (state, action) => {
        state.loading = false
        state.group = action.payload
      })
      .addCase(getUserGroupsByUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})