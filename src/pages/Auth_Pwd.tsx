import React, { useState } from "react";
import {
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRouterLink,
  useIonAlert,
} from "@ionic/react";
import logo from "../css/img/logo.png";
import "../css/auth.scss";
import { lockClosedOutline, eyeOffOutline } from "ionicons/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setUser } from "../redux/slices/user";
import { useHistory } from "react-router";
import { myAxios } from "../config/config";
const Auth_Pwd: React.FC = () => {
  const history = useHistory();
  const Dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.User);
  const [Msgbox, dismiss] = useIonAlert();
  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");
  const showPassword = (nb: number) => {
    const pwd = document.getElementById(`pwd${nb}`);
    pwd?.getAttribute("type") === "password"
      ? pwd?.setAttribute("type", "text")
      : pwd?.setAttribute("type", "password");
  };
  const savePwd = async () => {
    if (pwd1 != pwd2) {
      Msgbox({
        header: "Changement de mot de passe",
        message: "Mots de passe différents",
        buttons: [
          {
            text: "OK",
            handler: () => {
              dismiss();
              return;
            },
          },
        ],
      });
    } else {
      const usr = await myAxios(`setpwd`, {
        pwd: pwd1,
        mail: user.user.mail,
      })
        .then((data) => data.data)
        .catch((err) =>
          Msgbox({
            header: "Authentification",
            message: err,
            buttons: [
              {
                text: "Ok",
                handler: () => {
                  dismiss();
                  return;
                },
              },
            ],
          })
        );
      // if (usr.result) {
      //   Dispatch(setUser({ ...user.user, isTemp: false }));
      //   // const rememberMe = localStorage.getItem("remeberMe");
      //   if (rememberMe != undefined) {
      //     let parsedData = JSON.parse(rememberMe);
      //     parsedData = { ...parsedData, pwd: pwd1 };
      //     localStorage.setItem("remeberMe", JSON.stringify(parsedData));
      //   }
      //   history.push("/page/Menu");
      // }
    }
  };
  return (
    <IonPage id="auth">
      <div className="auth">
        <img src={logo} alt="RayOne ERP" className="logo" width="50%" />
        <IonList>
          <IonItem>
            <IonIcon slot="start" icon={lockClosedOutline} />
            <IonLabel position="floating">Mot de passe</IonLabel>
            <IonInput
              placeholder="Mot de passe"
              type="password"
              value={pwd1}
              id="pwd1"
              onIonChange={(e) => setPwd1(e.detail.value || "")}
            ></IonInput>
            <IonIcon
              id="showPw"
              slot="end"
              icon={eyeOffOutline}
              onClick={() => showPassword(1)}
            />
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={lockClosedOutline} />
            <IonLabel position="floating">Confirmez le mot de passe</IonLabel>
            <IonInput
              placeholder="Confirmez"
              type="password"
              value={pwd2}
              id="pwd2"
              onIonChange={(e) => setPwd2(e.detail.value || "")}
            ></IonInput>
            <IonIcon
              id="showPw"
              slot="end"
              icon={eyeOffOutline}
              onClick={() => showPassword(2)}
            />
          </IonItem>
        </IonList>
        <button id="loginbtn" onClick={() => savePwd()}>
          Enregistrer
        </button>
        <button id="connexion">
          <IonRouterLink routerLink={`/`}>Annuler</IonRouterLink>
        </button>
      </div>
    </IonPage>
  );
};

export default Auth_Pwd;
