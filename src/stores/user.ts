import { StateCreator } from 'zustand'

export interface UserState {
  username: string | null,
}

export interface UserActions {
  login: (credentials: { username: string }) => void,
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
  },
})
