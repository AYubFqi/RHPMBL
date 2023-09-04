import React, { useState } from "react";
import {
    IonBackButton,
    IonButtons,
    IonCol,
    IonContent,
    IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNavLink,
  IonPage,
  IonRouterLink,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import logo from "../css/img/logo.png";
import "../css/param_auth.scss";
import { lockClosedOutline, eyeOffOutline } from "ionicons/icons";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useHistory } from "react-router";
import { myAxios } from "../config/config";


const Param_Pwd: React.FC = () => {
  const history = useHistory();
  const user = useSelector((state: RootState) => state.User);
  const [Msgbox, dismiss] = useIonAlert();
  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [oldpwd, setOldpwd] = useState("");
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
      if (usr.result) {
        history.push('/page/');
      }
    }
  };
  return (
    <IonPage >
        <IonHeader >
        <IonToolbar color="rayfirst">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/page/accueil/dash/"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <div id='param_auth'>
      <div className="param_auth">
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
      </div>
      </div>
      </IonContent>
        
      
    </IonPage>
  );
};

export default Param_Pwd;
