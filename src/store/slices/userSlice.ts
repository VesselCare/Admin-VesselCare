// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserPermission } from "@/types";

export interface UserState {
  isLoggedIn: boolean;
  user: User | null;
  dataUser: UserPermission[];
  isLoading: boolean;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
  dataUser: [],
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Define o estado do usuário
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    // Define o estado das permissões do usuário
    setDataUser: (state, action: PayloadAction<UserPermission[]>) => {
      state.dataUser = action.payload;
    },
    // Define o estado de logout
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.dataUser = [];
    },
    // Define o estado loading
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUser, setDataUser, logout, setIsLoggedIn } =
  userSlice.actions;
export default userSlice.reducer;
