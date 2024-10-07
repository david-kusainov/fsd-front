import { GroupDto } from "@entities/dto"
import { deleteGroup, getGroupById } from "@entities/group"
import { checkSubscription, subscribeToGroup, unSubscribeToGroup } from "@entities/user"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const getGroupByIdThunk = createAsyncThunk(
  'group/getGroupById',
  async (groupId: any, { rejectWithValue }) => {
    return await getGroupById(groupId)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const subscribeToGroupThunk = createAsyncThunk(
  'group/subscribeToGroup',
  async (args: {userId: number, groupId: string}) => {
    return await subscribeToGroup(args)
    .then((response) => response)
    .catch((error) => error)
  }
)

export const unSubscribeToGroupThunk = createAsyncThunk(
  'group/subscribeToGroup',
  async (args: {userId: number, groupId: string}) => {
    return await unSubscribeToGroup(args)
    .then((response) => response)
    .catch((error) => error)
  }
)

export const checkSubscriptionThunk = createAsyncThunk(
  'group/checkSubscribe',
  async (args: {userId: number, groupId: string}) => {
    return await checkSubscription(args)
    .then((response) => response)
    .catch((error) => error)
  }
)

export const deleteGroupThunk = createAsyncThunk(
  'group/delete',
  async (groupId: string) => {
    return await deleteGroup(groupId)
    .then((response) => response)
    .catch((error) => error)
  }
)

export const singleGroupSlice = createSlice({
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

      .addCase(checkSubscriptionThunk.pending, (state) => {
        state.loading = true,
        state.error = null
      })
      .addCase(checkSubscriptionThunk.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(checkSubscriptionThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})
