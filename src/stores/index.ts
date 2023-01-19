import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createCurrencySlice, CurrencyState, CurrencyActions } from './currency'
import { createUserSlice, UserState, UserActions } from './user'

// Use currying workaround to set slices on global store:
// https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md#basic-usage
export const useBoundStore = create<
  CurrencyState &
  CurrencyActions &
  UserState &
  UserActions
>()(
  devtools(
    (...a) => ({
      ...createCurrencySlice(...a),
      ...createUserSlice(...a),
    })
  )
)
