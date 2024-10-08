import { GroupDto } from "@entities/dto";
import { getGroupsByOwner, getGroupsByUser } from "@entities/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getGroupsByUserThunk = createAsyncThunk(
  'user/getUserGroupsByUser',
  async(userId: number, { rejectWithValue }) => {
    return await getGroupsByUser(userId)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const getGroupsByOwnerThunk = createAsyncThunk(
  'user/getGroupsByOwner',
  async(userId: number, { rejectWithValue }) => {
    return await getGroupsByOwner(userId)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const getGroupsByUserSlice = createSlice({
  name: 'userGroupsTab',
  initialState: {
    loading: false,
    subscribedGroups: [] as GroupDto[],
    ownedGroups: [] as GroupDto[],
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroupsByUserThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getGroupsByUserThunk.fulfilled, (state, action) => {
        state.loading = false
        state.subscribedGroups = action.payload
      })
      .addCase(getGroupsByUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(getGroupsByOwnerThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getGroupsByOwnerThunk.fulfilled, (state, action) => {
        state.loading = false
        state.ownedGroups = action.payload
      })
      .addCase(getGroupsByOwnerThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})