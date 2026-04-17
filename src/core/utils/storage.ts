import { createMMKV } from "react-native-mmkv";
import { StoreKeyTypes } from "./types";


const Astorage = createMMKV();

export class storage {
  static getItem (key: StoreKeyTypes) {
    try {
      return  Astorage.getString(key) 
    } catch (error) {
      console.log(error);
    }
  }
  static async setItem (key: StoreKeyTypes, data:string) {
    try {
      return Astorage.set(key, data) 
    } catch (error) {
      console.log(error);
    }
  }
  static async removeItem (key:StoreKeyTypes) {
    try {
      return  Astorage.remove(key) 
    } catch (error) {
      console.log(error);
    }
  }
}