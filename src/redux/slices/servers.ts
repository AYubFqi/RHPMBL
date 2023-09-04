import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ServerItem } from "../../config/config";

const majLocalStorage = (srvs: ServerItem[]) => {
  localStorage.setItem("serverList", JSON.stringify(srvs));
};

export interface Servers {
  serverList: ServerItem[];
  activeServer: string;
}

const initialState: Servers = {
  serverList: [],
  activeServer: "",
};

export const ServersSlice = createSlice({
  name: "ServerList",
  initialState,
  reducers: {
    MajStateFromLocalStorage: (state, action: PayloadAction<ServerItem[]>) => {
      state.serverList = action.payload;
    },
    ModifierConnexion: (state, action: PayloadAction<ServerItem>) => {
      let ind = -1;
      state.serverList.forEach((itm: ServerItem) => {
        if (itm.Nom === action.payload.Nom) {
          ind = state.serverList.indexOf(itm);
          return;
        }
      });
      if (ind >= 0) {
        state.serverList[ind] = action.payload;
      } else {
        state.serverList.push(action.payload);
      }

      majLocalStorage(state.serverList);
    },
    SupprimerConnexion: (state, action: PayloadAction<string>) => {
      const newServersList = <ServerItem[]>[];
      state.serverList.forEach((itm: ServerItem) => {
        if (itm.Nom != action.payload) {
          newServersList.push(itm);
        }
      });
      state.serverList = newServersList;
      majLocalStorage(newServersList);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  ModifierConnexion,
  SupprimerConnexion,
  MajStateFromLocalStorage,
} = ServersSlice.actions;

export default ServersSlice.reducer;
