import { GroupDto } from "@entities/dto"
import { getAllGroups } from "@entities/group"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const getAllGroupsThunk = createAsyncThunk(
  'group/getAllGroups',
  async (_, { rejectWithValue }) => {
    return await getAllGroups()
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const archiveGroupSlice = createSlice({
  name: 'groupArchive',
  initialState: {
    isLoading: false,
    groups: [] as GroupDto[],
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroupsThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getAllGroupsThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.groups = action.payload
      })
      .addCase(getAllGroupsThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})
