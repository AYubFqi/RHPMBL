import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface user {
  idsociete : string;
  nom: string;
  prenom: string;
  mail: string;
  fonction: string;
  Entite: string;
  Matricule: string;
  gsm : string;
  suppleant :string;
  isTemp: boolean;
  notification : boolean;
}

const initialState = {
  user: <user>{
    idsociete:"",
    nom: "",
    prenom: "",
    mail: "",
    fonction: "",
    Entite: "",
    Matricule: "",
    gsm :"",
    suppleant :"",
    isTemp: false,
    notification: true,
  },
  isLogged: false,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<user>) => {
      state.user = { ...action.payload };
    },
    setLogged: (state) => {
      state.isLogged = !state.isLogged;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setLogged } = UserSlice.actions;

export default UserSlice.reducer;
