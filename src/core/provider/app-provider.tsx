/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect } from "react";
import { useAppDispatch } from "../hooks/redux";
import { loadFavoriteState } from "../../features/favorite/favoriteSlice";

interface AppProviderProps {
    children: React.ReactNode;
}


export default function AppProvider({ children }: AppProviderProps) {
  const dispatch = useAppDispatch()

  useLayoutEffect(() =>{
    dispatch(loadFavoriteState())
  },[])
  return children
}