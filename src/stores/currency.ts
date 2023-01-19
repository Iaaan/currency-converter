import { StateCreator } from 'zustand'

const API_BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/'
const API_GET_ALL_CURRENCIES = API_BASE_URL + 'currencies.json'

export interface Currencies {
  [k: string]: string,
}

export type SelectedCurrencies = [string?, string?]

export interface CurrencyState {
  currencies: Currencies,
  selectedCurrencies: SelectedCurrencies,
  page: number,
}

export interface CurrencyActions {
  fetchAllCurrencies: () => void,
}

export const createCurrencySlice: StateCreator<
  CurrencyState & CurrencyActions,
  [],
  [],
  CurrencyState & CurrencyActions
> = set => ({
  /**
   * Currency map: {currency code: currency display name, ...}
   */
  currencies: {},

  /**
   * Tuple storing selected currencies for conversion.
   */
  selectedCurrencies: [],

  /**
   * Page number for currency display.
   */
  page: 0,

  fetchAllCurrencies: async () => {
    const res = await fetch(API_GET_ALL_CURRENCIES)
    const currencies = await res.json()

    set({currencies})
  },
})
