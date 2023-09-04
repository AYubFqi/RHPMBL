import React, { useState, useEffect } from "react";
import {
  useIonAlert,
  useIonLoading,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonAlert,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import "../css/auth.scss";
import logo from "../css/img/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { ServerItem } from "../config/config";
import { ModifierConnexion, SupprimerConnexion } from "../redux/slices/servers";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import { caretBack } from "ionicons/icons";

interface paramsF {
  conn: string;
}
const Auth_Connection: React.FC = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [Msgbox] = useIonAlert();
  const history = useHistory();
  const [present, dismiss] = useIonLoading();
  const valserverList: ServerItem[] = useSelector(
    (state: RootState) => state.ListConnexions.serverList
  );
  const Dispatch = useDispatch();
  const { conn } = useParams<paramsF>();
  const [cred, setCred] = useState<ServerItem>({ Nom: "", ADR: "", DB: "" });
  useEffect(() => {
    setCred({ ...cred, Nom: conn || "" });
  }, []);

  const [alerte, setAlerte] = useState("");
  const [errMsg, setErrMsg] = useState({ connErr: "", AdrErr: "", dbErr: "" });

  const ChargerConnexion = (connName: string) => {
    const rsl: ServerItem[] = valserverList.filter(
      (srv: ServerItem) => srv.Nom === connName
    );
    if (rsl.length > 0) {
      setCred(rsl[0]);
    } else {
      setCred({
        ADR: "",
        DB: "",
        Nom: connName,
      });
    }
  };
  const saving = async () => {
    hideErrMsg();
    if (cred.Nom.trim() === "") {
      setErrMsg({ ...errMsg, connErr: "* Obligatoire" });
      document.getElementById("connErr")?.classList.remove("errMsgHidden");
      return null;
    }
    if (/\W/.test(cred.Nom)) {
      setErrMsg({
        ...errMsg,
        connErr: "* Les caractères spéciaux et les espaces sont interdits",
      });
      document.getElementById("connErr")?.classList.remove("errMsgHidden");
      return null;
    }
    if (cred.ADR.trim() === "") {
      setErrMsg({ ...errMsg, AdrErr: "L'adresse est obligatoire" });
      document.getElementById("adresseErr")?.classList.remove("errMsgHidden");
      return null;
    }
    if (cred.DB.trim() === "") {
      setErrMsg({ ...errMsg, dbErr: "* Obligatoire" });
      document.getElementById("dbErr")?.classList.remove("errMsgHidden");
      return null;
    }
    present({
      message: "Veuillez patienter...",
    });
    const data = await axios
      .post(`${cred.ADR}/api/auth/config`, { dataBase: cred.DB })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        dismiss();
        setErrMsg({ ...errMsg, connErr: error.toString() });
        document.getElementById("connErr")?.classList.remove("errMsgHidden");
        return null;
      });
    dismiss();
    if (data?.exist) {
      setAlerte("succes");
      Dispatch(ModifierConnexion(cred));
      history.push("/");
    } else {
      setAlerte("echec");
      setTimeout(() => {
        setAlerte("");
      }, 3000);
    }
  };

  const hideErrMsg = () => {
    setAlerte("");
    setErrMsg({ connErr: "", AdrErr: "", dbErr: "" });
    if (
      !document.getElementById("connErr")?.classList.contains("errMsgHidden")
    ) {
      document.getElementById("connErr")?.classList.add("errMsgHidden");
    }
    if (
      !document.getElementById("adresseErr")?.classList.contains("errMsgHidden")
    ) {
      document.getElementById("adresseErr")?.classList.add("errMsgHidden");
    }
    if (!document.getElementById("dbErr")?.classList.contains("errMsgHidden")) {
      document.getElementById("dbErr")?.classList.add("errMsgHidden");
    }
  };
  const deleting = () => {
    Msgbox({
      header: "Suppression",
      message: "Etes-vous sûr de vouloir supprimer cette connexion?",
      buttons: [
        {
          text: "Annuler",
        },
        {
          text: "Supprimer",
          handler: () => {
            Dispatch(SupprimerConnexion(cred.Nom));
            history.push("/");
          },
        },
      ],
    });
  };
  return (
    <IonPage id="auth">
      <div className="auth">
      <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="Fermer" color="light" icon={caretBack}></IonBackButton>
      </IonButtons>
        <img src={logo} alt="RayOne ERP" className="logo" width="50%" />
        <div className="alerte">
          {alerte === "succes" && (
            <Alert severity="success">Enregistré avec succès</Alert>
          )}
          {alerte === "echec" && <Alert severity="error">non enregistré</Alert>}
        </div>
        <Autocomplete
          id="connexion_autocomplete"
          freeSolo
          value={cred.Nom}
          options={valserverList.map((option) => option.Nom)}
          renderInput={(params) => <TextField {...params} label="Connexion" />}
          onInputChange={(e, v) => {
            ChargerConnexion(v || "");
            hideErrMsg();
          }}
        />
        <span id="connErr" className="errMsg errMsgHidden">
          {errMsg.connErr}
        </span>
        <IonList id="connlistinput">
          <IonItem id="connection">
            <IonLabel  position="floating">Adresse</IonLabel>
            <IonInput
              placeholder="Adresse"
              id="adresse"
              value={cred.ADR}
              onIonChange={(e) => {
                setCred({ ...cred, ADR: e.detail.value || "" });
                hideErrMsg();
              }}
            ></IonInput>
            <span id="adresseErr" className="errMsg errMsgHidden">
              {errMsg.AdrErr}
            </span>
          </IonItem>
          <IonItem id="connection">
            <IonLabel position="floating">Base de données</IonLabel>
            <IonInput
              placeholder="Base de données"
              id="db"
              value={cred.DB}
              onIonChange={(e) => {
                setCred({ ...cred, DB: e.detail.value || "" });
                hideErrMsg();
              }}
            ></IonInput>
            <span id="dbErr" className="errMsg errMsgHidden">
              {errMsg.dbErr}
            </span>
          </IonItem>
        </IonList>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass="my-custom-class"
          header={"Alert"}
          subHeader={"Subtitle"}
          message={"This is an alert message."}
          buttons={["OK"]}
        />
        <button id="save" onClick={saving}>
          Enregistrer
        </button>
        <button id="delete" onClick={deleting}>
          Supprimer
        </button>
      </div>
    </IonPage>
  );
};

export default Auth_Connection;
