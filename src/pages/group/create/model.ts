import { CreateGroupDto } from "@entities/dto";
import { createGroup } from "@entities/group";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createGroupThunk = createAsyncThunk(
  'group/createGroup',
  async (args: {userId: number, data: CreateGroupDto }, { rejectWithValue }) => {
    return await createGroup(args)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const createGroupSlice = createSlice({
  name: 'createGroup',
  initialState: {
    loading: false,
    groupId: null as number | null,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGroupThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createGroupThunk.fulfilled, (state, action) => {
        state.loading = false
        state.groupId = action.payload.id
      })
      .addCase(createGroupThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})
