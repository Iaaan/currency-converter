import { StateCreator } from 'zustand'

const API_BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest'
const API_GET_ALL_CURRENCIES = API_BASE_URL + 'currencies.json'

export interface Currencies {
  [k: string]: string,
}

export interface CurrencyState {
  currencies: Currencies,
  conversion: number | null,
}

export interface CurrencyActions {
  fetchAllCurrencies: () => void,
  fetchConversion: (c1: string, c2: string) => {},
  clearConversion: () => void,
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
   * Conversion rate (number). Currencies to convert are controlled by
   * url query parameters.
   */
  conversion: null,

  fetchAllCurrencies: async () => {
    const res = await fetch(API_BASE_URL + '/currencies.json')
    const currencies = await res.json()

    set({currencies})
  },

  fetchConversion: async (c1, c2) => {
    const res = await fetch(`${API_BASE_URL}/currencies/${c1}/${c2}.json`)
    const conversion = await res.json()

    set({ conversion: conversion[c2] })
  },

  clearConversion: () => set({ conversion: null })
})
