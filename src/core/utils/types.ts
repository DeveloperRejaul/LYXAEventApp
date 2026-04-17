export type Error = {
  status: number;
  message:string
}
export type Success<T = any> = {
 data: T
}

export type StoreKeyTypes = 'favorite';