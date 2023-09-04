
export interface dataMsgF {
  id_msg: number;
  lu: boolean;
  alerted: boolean;
  dat_msg: string;
  lien: string;
  objet: string;
  msg: string;
  id_sender: number;
  sender: string;
  attn: string;
}
export interface filtreF {
  id_sender: number;
  id_attn: number[];
  objet: string;
  contient: string;
  dat_deb: string;
  dat_fin: string;
}
export const initialState: filtreF = {
  id_sender: 0,
  id_attn: [],
  objet: "",
  contient: "",
  dat_deb: "",
  dat_fin: "",
};
