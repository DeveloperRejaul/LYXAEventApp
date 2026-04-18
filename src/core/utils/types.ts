import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { Event } from "@src/features/home/type";

export type Error = {
  status: number;
  message:string
}
export type Success<T = any> = {
 data: T
}

export type StoreKeyTypes = 'favorite';

export type RootStackParamsList = {
  home: undefined;
  details: { event: Event };
  favorite: undefined;
}

export type ScreenType<T extends keyof RootStackParamsList> = NativeStackScreenProps<RootStackParamsList, T>;