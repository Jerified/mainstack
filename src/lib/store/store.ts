// src/lib/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { mainstackApi } from './mainstackApi'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [mainstackApi.reducerPath]: mainstackApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(mainstackApi.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']