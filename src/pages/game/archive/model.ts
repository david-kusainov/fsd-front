import { GameDto } from "@entities/dto"
import { getAllGames } from "@entities/game"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const getAllGamesThunk = createAsyncThunk(
  'group/getAllGroups',
  async (_, { rejectWithValue }) => {
    return await getAllGames()
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response ? error.response.data : error.message))
  }
)

export const archiveGameSlice = createSlice({
  name: 'groupArchive',
  initialState: {
    loading: false,
    games: [] as GameDto[],
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGamesThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllGamesThunk.fulfilled, (state, action) => {
        state.loading = false
        state.games = action.payload
      })
      .addCase(getAllGamesThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})
