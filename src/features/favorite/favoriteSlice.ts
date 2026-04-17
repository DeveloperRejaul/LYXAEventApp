import { createSlice } from '@reduxjs/toolkit'
import { Event } from '../home/type'
import { storage } from '../../core/utils/storage';


const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: [] as Event[],
  reducers: {
    toogleFavorite: (state, action) => {
      const event = action.payload as Event;
      if (!state.some(e => e.id === event.id)) {
        state.push(event);
      } else {
        return state.filter(e => e.id !== event.id);
      }
    },

    loadFavoriteState:(state) => {
      state.push(...(JSON.parse(storage.getItem('favorite') || '[]')) as Event[]);
    }
  },
})

export const { 
  toogleFavorite,
  loadFavoriteState
} = favoriteSlice.actions
export default favoriteSlice.reducer