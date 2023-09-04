import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNavLink,
  IonPage,
  IonRow,
  IonToggle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import {
  cameraOutline,
  cameraSharp,
  lockClosedOutline,
  lockClosedSharp,
  pencilOutline,
} from "ionicons/icons";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { findLibelle, myAxios } from "../config/config";
import SpeInputZoom from "../components/smallComponents/SpeInputZoom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/user";
import Param_Pwd from "./Param_Pwd";
import { useEffect, useState } from "react";
import SpePictureBox from "../components/smallComponents/SpePictureBox";
import { Camera, CameraResultType } from "@capacitor/camera";

const SettingsPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.User.user);
  const [dataImg, setDataImg] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Msgbox, dismiss] = useIonAlert();
  const Dispatch = useDispatch();
  const artImages = (visible: boolean) => {
    return (
      <div style={{ display: visible ? "" : "none" }}>
        {dataImg != undefined ? (
          
          <SpePictureBox id="img" img={dataImg} alt="image" />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  };
  const convertToBase64 = (url: any) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    });
  };
  const enregistrerImage = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });
      let dataPath: any = await convertToBase64(image.webPath);
      setDataImg(dataPath);
      await myAxios(`UserphotoUpload`, {
        img: dataPath.replace('data:image/png;base64,',''),
        Matricule: user.Matricule,
      })
        .then((data) => {
          const result = data.data.result;
          if (!result)
            Msgbox({
              header: "Photo de Profile",
              message:
                "impossible d'enregistrer l'image dans la base de données",
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
        })
        .catch((err) => {
          Msgbox({
            header: "Photo de Profile",
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
          });
        });
      setIsLoading(true);
    } catch {
      return false;
    }
  };

  const saveUserUpdates = async () => {
    await myAxios(`updateUser`, {
      user: user,
    })
      .then((data) => {
        if (data.data )
        Msgbox({
          header: "Profile",
          message: "Profile à jour",
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
      })
      .catch((err) =>
        Msgbox({
          header: "Profile",
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
  };

  useEffect(() => {
    const loadimg = async () => {
      await myAxios(`Userphoto`, {
        Matricule: user.Matricule,
      })
        .then((data) => {
          const buffer = "data:image/png;base64," + data.data.data;
          setDataImg(buffer);
          setIsLoading(true);
        })
        .catch((err) => {
          Msgbox({
            header: "Profile",
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
          });
        });
    };
    loadimg();
  }, []);

  const reset = (champs: string) => {
    Dispatch(setUser({ ...user, [champs]: "" }));
  };
  const onchange = (champs: string, valeur: any) => {
    Dispatch(setUser({ ...user, [champs]: "" }));
  };
  const confirm = (champs: string, valeur: any) => {
    Dispatch(setUser({ ...user, [champs]: "" }));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="rayfirst">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/page/accueil/dash/"></IonBackButton>
          </IonButtons>
          <IonLabel>{user.nom}</IonLabel>
          <IonButtons slot="end">
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>
              <IonLabel>
                <span>Collaborateur :{user.nom}</span> {user.prenom}
              </IonLabel>
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonCardTitle>
              {artImages(isLoading)}
              <IonFab vertical="bottom" horizontal="end">
                <IonFabButton
                  size="small"
                  color="light"
                  onClick={() => enregistrerImage()}
                >
                  <IonIcon
                    size="large"
                    md={cameraOutline}
                    ios={cameraSharp}
                  ></IonIcon>
                </IonFabButton>
              </IonFab>
            </IonCardTitle>
          </IonCardContent>
        </IonCard>

        <IonList translate="yes">
          <IonItem>
            <IonLabel>Notification</IonLabel>
            <div className="Notification">
              <IonToggle
                id="Notification"
                slot="end"
                checked={user.notification}
                onIonChange={(e) => {
                  Dispatch(setUser({ ...user, notification : !user.notification }));
                }}
                color="secondary"
              ></IonToggle>
            </div>
          </IonItem>

          <IonNavLink routerDirection="forward" component={() => <Param_Pwd />}>
            <IonItem>
              <IonLabel>Modifier le mot de passe</IonLabel>
              <IonIcon
                md={lockClosedOutline}
                ios={lockClosedSharp}
                slot="end"
              ></IonIcon>
            </IonItem>
          </IonNavLink>

          <IonItem>
            <IonLabel>Nom</IonLabel>
            <IonInput
              placeholder={user.nom}
              onIonChange={(e) => {
                if(typeof e.target.value === "string")
                 Dispatch(setUser({ ...user, nom: e.target?.value }));
              }}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Prénom</IonLabel>
            <IonInput
              type="text"
              placeholder={user.prenom}
              onIonChange={(e) => {
                if(typeof e.target.value === "string")
                 Dispatch(setUser({ ...user, prenom: e.target?.value }));
              }}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Email</IonLabel>
            <IonInput
              type="email"
              placeholder={user.mail}
              onIonChange={(e) => {
                if(typeof e.target.value === "string")
                 Dispatch(setUser({ ...user, mail: e.target?.value }));
              }}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>GSM</IonLabel>
            <IonInput
              type="tel"
              placeholder={user.gsm}
              onIonChange={(e) => {
                if(typeof e.target.value === "string")
                 Dispatch(setUser({ ...user, gsm: e.target?.value }));
              }}
            ></IonInput>
          </IonItem>
          
          <IonItem>
            {/* <SpeInputZoom
              id="login"
              titre="Suppléant"
              value={{ code: user?.suppleant, libelle: "" }}
              type="MS"
              numero="MS003"
              params={`Login_User !='${user?.login}'`}
              onChange={onchange}
              confirm={confirm}
              reset={reset}
              getLibelle={() => {
                return findLibelle(
                  "Nom_User",
                  "Controle_Users",
                  `Login_User='${user?.login}'`,
                  ""
                );
              }}
            /> */}
          </IonItem>
          <IonItem>
            <IonGrid>
              <IonRow>
                <IonCol size="3"></IonCol>
                <IonCol size="6">
                  <IonButton
                    expand="full"
                    color="primary"
                    onClick={() => saveUserUpdates()}
                  >
                    <IonIcon icon={pencilOutline}></IonIcon>Enregister
                  </IonButton>
                </IonCol>
                <IonCol size="3"></IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
