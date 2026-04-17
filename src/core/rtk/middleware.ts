import { Middleware } from '@reduxjs/toolkit';
import { storage } from '../utils/storage';

export const Storage: Middleware = (storeAPI) => (next) => (action:any) => {
  const result = next(action);
  const state =  storeAPI.getState()

  if(action?.type?.startsWith('favorite/')) {
    storage.setItem('favorite', JSON.stringify(state.favorite));
  }
  return result;
};