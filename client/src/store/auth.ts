import { create } from "zustand";
type Role = "user"|"support"|"admin";
type User = { id:number; username:string; email:string; role:Role };
type State = { user?:User; token?:string };
type Actions = {
  setAuth: (payload: { user:User; token:string }) => void;
  clear: () => void;
};
export const useAuthStore = create<State & Actions>((set) => ({
  user: undefined, token: undefined,
  setAuth: ({ user, token }) => set({ user, token }),
  clear: () => set({ user: undefined, token: undefined })
}));
