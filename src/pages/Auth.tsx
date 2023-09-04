import React, { useEffect, useState } from "react";
import {
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonToggle,
  useIonAlert,
} from "@ionic/react";
import "../css/auth.scss";
import logo from "../css/img/logo.png";
import {
  wifiOutline,
  personCircleOutline,
  lockClosedOutline,
  eyeOffOutline,
  personCircleSharp,
  lockClosedSharp,
  eyeOffSharp,
  wifiSharp
} from "ionicons/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  Connexion,
  ServerItem,
  setConnexion,
} from "../config/config";
import { MajStateFromLocalStorage } from "../redux/slices/servers";
import axios from "axios";
import { useHistory } from "react-router";
import { setLogged, setUser } from "../redux/slices/user";



const Auth: React.FC = () => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [erreurConnexion, setErreurConnexion] = useState("");
  const history = useHistory();
  const [Msgbox, dismiss] = useIonAlert();
  interface credentials {
    connexion: string;
    login: string;
    pwd: string;
    RemeberMe: boolean;
  }
  const [cred, setCred] = useState<credentials>({
    connexion: "",
    login: "",
    pwd: "",
    RemeberMe: false,
  });
  const Dispatch = useDispatch();
  const isValidEmail = (email:string) => {
    return emailPattern.test(email);
  };
  
  const valserverList: ServerItem[] = useSelector(
    (state: RootState) => state.ListConnexions.serverList
  );
  
  const user = useSelector((state: RootState) => state.User);
  const listConn = valserverList?.map((srv: ServerItem) => {
    return (
      <IonSelectOption color="rayfirst" value={srv.Nom} key={srv.Nom}>
        {srv.Nom}
      </IonSelectOption>
      
    );
  });
  const showPassword = () => {
    const pwd = document.getElementById("pwd");
    pwd?.getAttribute("type") === "password"
      ? pwd?.setAttribute("type", "text")
      : pwd?.setAttribute("type", "password");
  };
  useEffect(() => {
    const serverList: string = localStorage?.getItem("serverList") || "";
    if (serverList !== "") {
      Dispatch(MajStateFromLocalStorage(JSON.parse(serverList)));
    }
    const RemeberMeLS: string = localStorage.getItem("remeberMe") || "";
    if (RemeberMeLS != "") {
      setCred(JSON.parse(RemeberMeLS));
    }
   
  }, []);
  useEffect(() => {
    onConnexionChange(cred.connexion);
  }, [cred]);
  const rememberMeHandle = () => {
    const e = document.getElementById("RemeberMe")?.getAttribute("checked");
    if (e) {
      cred.RemeberMe = true;
      localStorage.setItem("remeberMe", JSON.stringify(cred));
    } else if (localStorage.getItem("remeberMe") != undefined) {
      localStorage.removeItem("remeberMe");
    }
  };
  const onConnexionChange = (connName: string) => {
    const rsl: ServerItem[] = valserverList.filter(
      (srv: ServerItem) => srv.Nom === connName
    );
    if (rsl.length > 0) {
      setConnexion(rsl[0]);
    } else {
      setConnexion({
        ADR: "",
        DB: "",
        Nom: connName,
      });
    }
  };
  const loginHandle = async () => {
    if (cred.login.trim() != "" && cred.pwd.trim() === "") {
      Msgbox({
        header: "Mot de passe vide",
        message: "Merci de vérifier votre mot de passe",
        buttons: [
          {
            text: "Ok",
            handler: () => {
              document
                .getElementById("forgotMyPwd")
                ?.classList.remove("errMsgHidden");
              document.getElementById("forgotMyPwd")?.focus();
              dismiss();
              return;
            },
          },
        ],
      });
    }
    if (!Connexion.ADR || !Connexion.DB) {
      Msgbox({
        header: "Authentification",
        message: "Eléments de connexion manquants",
        buttons: [
          {
            text: "Ok",
            handler: () => {
              dismiss();
              return;
            },
          },
        ],
      });
    }
    const usr = await axios
      .post(`${Connexion.ADR}/api/getuser`, {
        db: Connexion.DB,
        pwd: cred.pwd,
        login: cred.login,
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
    if (!usr.result && usr.data.length === 0) {
      Msgbox({
        header: "Authentification",
        message: "Login ou mot de passe incorrect",
        buttons: [
          {
            text: "Ok",
            handler: () => {
              document
                .getElementById("forgotMyPwd")
                ?.classList.remove("errMsgHidden");
              document.getElementById("forgotMyPwd")?.focus();
              dismiss();
              return;
            },
          },
        ],
      });
    } else if (!usr.result) {
      Msgbox({
        header: "Authentification",
        message: `Erreur d'authentification : ${usr.data}`,
        buttons: [
          {
            text: "Ok",
            handler: () => {
              document
                .getElementById("forgotMyPwd")
                ?.classList.remove("errMsgHidden");
              document.getElementById("forgotMyPwd")?.focus();
              dismiss();
              return;
            },
          },
        ],
      });
    } else {
      Dispatch(setUser(usr.data));
      rememberMeHandle();
      history.push("/page/accueil/dash/");
    }
  };
  const motPassOublie = async () => {
    Msgbox({
      header: "Mot de passe",
      message: "Etes-vous sûr de vouloir regénérer votre mot de passe?",
      buttons: [
        {
          text: "Ok",
          handler: async () => {
            dismiss();
            if (!cred.login) {
              Msgbox({
                header: "Mot de passe",
                message: `Login vide`,
                buttons: [
                  {
                    text: "Ok",
                    handler: () => {
                      return;
                    },
                  },
                ],
              });
            } else if (!Connexion.ADR || !Connexion.DB) {
              Msgbox({
                header: "Mot de passe oublié",
                message: "Eléments de connexion manquants",
                buttons: [
                  {
                    text: "Ok",
                    handler: () => {
                      dismiss();
                      return;
                    },
                  },
                ],
              });
            } else {
              const getPwd = await axios
                .post(`${Connexion.ADR}/api/getpwd`, {
                  login: cred.login.trim(),
                  db: Connexion.DB,
                })
                .then((data) => {
                  return data.data;
                })
                .catch((err) => {
                  return { result: false, data: err };
                });
              if (!getPwd.result) {
                Msgbox({
                  header: "Mot de passe",
                  message: `Impossible de se connecter au serveur. ${getPwd.data}`,
                  buttons: [
                    {
                      text: "Ok",
                      handler: () => {
                        dismiss();
                        return;
                      },
                    },
                  ],
                });
              } else {
                Msgbox({
                  header: "Réinitialisation de mot de passe",
                  message: `Un nouveau de passe a été envoyé au compte :${getPwd.data[0]} `,
                  buttons: [
                    {
                      text: "Ok",
                      handler: () => {
                        dismiss();
                      },
                    },
                  ],
                });
              }
            }
          },
        },
        {
          text: "Annuler",
          handler() {
            return;
          },
        },
      ],
    });
  };
  return (
    <IonPage id="auth">
      {erreurConnexion && <div className="ErreurConn">{erreurConnexion}</div>}
      <div className="auth">
        <img src={logo} alt="RayOne ERP" className="logo" width="50%" />
        <div className="version"> Version : 2023.000.01</div>
        <IonList id="connlist">
          <IonItem id="connection">
            <IonIcon
              color="rayfirst"
              slot="start"
              md={wifiOutline}
              ios={wifiSharp}
            />
            <IonSelect
              color="rayfirst"
              interface="action-sheet"
              value={Connexion.Nom}
              placeholder="Connexion"
              id="loginSelect"
              cancelText=""
              
              onIonChange={(e) => {
                if(e.detail.value == "Nouvelle"){history.push('/connexion_manager/')}
                setCred({ ...cred, connexion: e.detail.value || "" });
                onConnexionChange(e.detail.value || "");
              }}
            >
              {listConn}
              <IonSelectOption  value="Nouvelle" >
              + Nouvelle connexion 
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem id="connection">
            <IonIcon
              color="rayfirst"
              slot="start"
              md={personCircleOutline}
              ios={personCircleSharp}
            />
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              placeholder="Email"
              id="login"
              value={cred.login}
              onIonChange={(e) => {
                const email = e.detail.value || "";
                if (isValidEmail(email)) {
                  setCred({ ...cred, login: email });
                } else {
                  Msgbox({
                    header: "",
                    message: `Adresse e-mail invalide`,
                    buttons: [
                      {
                        text: "Ok",
                        handler: () => {
                          dismiss();
                        },
                      },
                    ],
                  })
                }
              }}
            ></IonInput>
          </IonItem>
          <IonItem id="connection">
            <IonIcon
              color="rayfirst"
              slot="start"
              md={lockClosedOutline}
              ios={lockClosedSharp}
            />
            <IonLabel position="floating">Mot de passe</IonLabel>
            <IonInput
              placeholder="Mot de passe"
              type="password"
              value={cred.pwd}
              id="pwd"
              onIonChange={(e) =>
                setCred({ ...cred, pwd: e.detail.value || "" })
              }
            ></IonInput>
            <IonIcon
              color="rayfirst"
              id="showPw"
              slot="end"
              md={eyeOffOutline}
              ios={eyeOffSharp}
              onClick={showPassword}
            />
          </IonItem>
        </IonList>
        <span
          id="forgotMyPwd"
          className="forgotMyPwd errMsgHidden"
          onClick={() => motPassOublie()}
        >
          J&apos;ai oublié mot de passe
        </span>
        <div className="rememberMe">
          <IonToggle
            id="RemeberMe"
            slot="end"
            checked={cred.RemeberMe}
            onClick={rememberMeHandle}
            color="rayfirst"
          ></IonToggle>
          <IonLabel className="lbl">Se souvenir de moi</IonLabel>
        </div>

        <button id="loginbtn" style={{fontSize:"1.2rem"}} onClick={() => loginHandle()}>
          Login
        </button>
        {/* <button id="connexion">
          <IonRouterLink style={{color: "#3899B9",fontSize:"1.2rem"}} routerLink={`/connexion_manager/${cred.connexion}`}>
            Connexion
          </IonRouterLink>
        </button> */}
        
      </div>
      
    </IonPage>
  );
};

export default Auth;
