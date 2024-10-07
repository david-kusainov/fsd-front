import { UpdateGroupDto } from "@entities/dto";
import { updateGroupById } from "@entities/group";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateGroupByIdThunk = createAsyncThunk(
  'group/UpdateGroupById',
  async (args: {groupId: string, data: UpdateGroupDto}, { rejectWithValue }) => {
    return await updateGroupById(args)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const updateGroupSlice = createSlice({
  name: 'updateGroup',
  initialState: {
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(updateGroupByIdThunk.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(updateGroupByIdThunk.fulfilled, (state) => {
      state.loading = false
    })
    .addCase(updateGroupByIdThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  }
})
