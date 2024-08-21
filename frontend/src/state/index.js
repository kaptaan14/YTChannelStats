import { configureStore, createSlice } from '@reduxjs/toolkit';


const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    data: null,
    topVideos: [],
  },
  reducers: {
    setChannelData: (state, action) => {
      state.data = action.payload;
    },
    setTopVideos(state, action) {
      state.topVideos = action.payload;
    },
  },
});

export const { setChannelData,setTopVideos } = channelSlice.actions;

const store = configureStore({
  reducer: {
    channel: channelSlice.reducer,
  },
});

export default store;
