import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  User,
  Wallet,
  Transaction
} from '../../types/index'

export const mainstackApi = createApi({
  reducerPath: 'mainstackApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://fe-task-api.mainstack.io/' 
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => 'user',
    }),
    getWallet: builder.query<Wallet, void>({
      query: () => 'wallet',
    }),
    getTransactions: builder.query<Transaction[], void>({
      query: () => 'transactions',
      transformResponse: (response: Transaction[]) => {
        return response.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      },
    }),
  }),
})

export const { 
  useGetUserQuery, 
  useGetWalletQuery, 
  useGetTransactionsQuery 
} = mainstackApi
