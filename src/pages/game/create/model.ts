import { CreateGameDto } from "@entities/dto";
import { createGame } from "@entities/game";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createGameThunk = createAsyncThunk(
  'game/createGame',
  async (data: CreateGameDto , { rejectWithValue }) => {
    return await createGame(data)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const createGameSlice = createSlice({
  name: 'createGame',
  initialState: {
    loading: false,
    gameId: null as number | null,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGameThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createGameThunk.fulfilled, (state, action) => {
        state.loading = false
        state.gameId = action.payload
      })
      .addCase(createGameThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})