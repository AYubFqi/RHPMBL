import axios from "axios";

import {
  folderOpenOutline,
  folderOpenSharp,
  documentTextOutline,
  documentTextSharp,
  barChartOutline,
  barChartSharp,
  receiptOutline,
  receiptSharp,
  bookOutline,
  bookSharp,
} from "ionicons/icons";

export interface ServerItem {
  Nom: string;
  ADR: string;
  DB: string;
}
export let Connexion: ServerItem = {
  Nom: "",
  ADR: "",
  DB: "",
};

export const setConnexion = (srv: ServerItem) => {
  Connexion = { ...srv };
};
interface typeecran {
  typ: string;
  md: any;
  ios: any;
}


export const ClientId = "460966774556-b42ai29d3nqri3a089l9c6u5gmfkdqqp.apps.googleusercontent.com";
export const ApiKey = "AIzaSyCeju8eiEGwtfJXuQvLluV9Q14PH4Rapkg";
export const Scopes = 'https://www.googleapis.com/auth/calendar';
export const Discovery_doc = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

export const getTypEcran = <typeecran>(typcran: string) => {
  switch (typcran) {
    case "rpt":
      return { typ: "Etat", md: receiptOutline, ios: receiptSharp };
    case "ecr":
      return { typ: "Page", md: documentTextOutline, ios: documentTextSharp };
    case "mnu":
      return { typ: "Menu", md: bookOutline, ios: bookSharp };
    case "fdr":
      return { typ: "Répértoire", md: folderOpenOutline, ios: folderOpenSharp };
    case "qry":
      return { typ: "Requête", md: barChartOutline, ios: barChartSharp };
    default:
      return { typ: "Requête", md: folderOpenOutline, ios: folderOpenSharp };
  }
};

export const getRegexPattern = (typcran: string) => {
  switch (typcran) {
    case "email":
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
    case "number":
      return /^(\d*|\d*\.?\d*)$/;
    case "entier":
      return /^\d*$/;
    case "date":
      return /^\d{2}\/\d{2}\/\d{4}$/;
    case "datetime":
      return /^\d{2}\/d{2}\/d{4}\s\s\d{2}:\d{2}$/;
    case "time":
      return /^\d{2}:\d{2}$/;
    case "tel":
      return /^[+(\d][\d+-]*\d$/;
    default:
      return /\.*/;
  }
};
export const findLibelle = async (
  libelle: string,
  tableName: string,
  condition: string,
  valeurSiNull: any
) => {
  return await myAxios(`findlibelle`, {
    libelle: libelle,
    condition: condition,
    tableName: tableName,
    valeurSiNull: valeurSiNull,
  })
    .then((data) => {
      return data.data.data.length > 0
        ? data.data.data[0].champs
        : valeurSiNull;
    })
    .catch(() => {
      return valeurSiNull;
    });
};
export const Key = "AIzaSyDLsik6eQS0eIFnmSQiF2lgyOksvnZ7yhM";
export const findRubrique = async (rubrique: string, valeur: string) => {
  const rsl = await findLibelle(
    "Membre",
    "Param_Rubriques",
    `Nom_Controle='${rubrique}' and isnull(Valeur,'')='${valeur}'`,
    ""
  );
  return rsl;
};
export const controleInjection = (champs: string) => {
  return /\b(eval)\b|\b(set)\b|\b(alter)\b|\b(create)\b|\b(drop)\b|\b(update)\b|\b(delete)\b|\b(truncate)\b/gi.test(
    champs
  );
};
export let access_token = "";
export const setAccessToken = (stoken: string) => {
  access_token = stoken;
};

export const myAxios = async (apiStr: string, bdy: any) => {
  const instance = axios.create({
    baseURL: Connexion.ADR
 })
  const headers = {
    authorisation: `Bearer ${access_token}`,
  };
  try {
    const rslPost = await instance.post(`/api/${apiStr}`, bdy, {
      headers: headers,
    });
    return rslPost;
  } catch (err: any) {
    // localStorage.setItem("erreurConnexion", err.message);
    // // window.location.href = "/";
  }
  return { data: "" };
};
