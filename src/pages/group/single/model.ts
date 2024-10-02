import { GroupDto } from "@entities/dto"
import { getGroupById } from "@entities/group"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const getGroupByIdThunk = createAsyncThunk(
  'group/getGroupById',
  async (groupId: any, { rejectWithValue }) => {
    return await getGroupById(groupId)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const getGroupByIdSlice = createSlice({
  name: 'getGroupById',
  initialState: {
    loading: false,
    group: null as GroupDto | null,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroupByIdThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getGroupByIdThunk.fulfilled, (state, action) => {
        state.loading = false
        state.group = action.payload
      })
      .addCase(getGroupByIdThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})