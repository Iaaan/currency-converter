import { StateCreator } from 'zustand'
import Router from 'next/router'

export interface UserState {
  username: string | null,
}

export interface UserActions {
  login: (credentials: { username: string }) => void,
  logout: () => void,
}

export const createUserSlice: StateCreator<
  UserState & UserActions,
  [],
  [],
  UserState & UserActions
> = set => ({
  /**
   * Using the username to track logged in status for spoofed 
   * login functionality.
   */
  username: null,

  /**
   * Fake login action. Sets username on the store.
   * @param credentials: { username: string } 
   */
  login: async ({ username }) => {
    const res = await new Promise(resolve => {
      setTimeout(() => resolve({ username }), 250)
    })

    set({ username })

    Router.push('/currencies')
  },

  /**
   * Fake logout action. Sets username to null.
   */
  logout: async () => {
    const res = await new Promise(resolve => {
      setTimeout(() => resolve(null), 250)
    })

    set({ username: null })

    Router.push('/login')
  },
})
