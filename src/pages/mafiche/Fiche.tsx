import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNavLink,
  IonRow,
  useIonAlert,
} from "@ionic/react";
import { Buffer } from "buffer";
import {
  cameraOutline,
  cameraSharp,
  lockClosedOutline,
  lockClosedSharp,
  pencilOutline,
} from "ionicons/icons";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";
import SpePictureBox from "../../components/smallComponents/SpePictureBox";
import { findLibelle, myAxios } from "../../config/config";
import { RootState } from "../../redux/store";
import Param_Pwd from "../Param_Pwd";
import SpeInputZoom from "../../components/smallComponents/SpeInputZoom";
import { user } from "../../redux/slices/user";

const Fiche: React.FC = () => {
  const user: user = useSelector((state: RootState) => state.User.user);
  const [dataImg, setDataImg] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Msgbox, dismiss] = useIonAlert();
  const Dispatch = useDispatch();
  const artImages = (visible: boolean) => {
    return (
      <div style={{ display: visible ? "" : "none" }}>
        {dataImg != undefined ? (
          <SpePictureBox id="img" img="../css/img/Profil.png" alt="image" />
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
        quality: 20,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });
      const dataPath: any = await convertToBase64(image.webPath);
      setDataImg(dataPath);
      await myAxios(`UserphotoUpload`, {
        img: dataPath,
        mail: user.mail,
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
    console.log(user);
    const loadimg = async () => {
      await myAxios(`Userphoto`, {
        mail: user.mail,
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
    //   Dispatch(setUser({ ...user, [champs]: "" }));
  };
  const onchange = (champs: string, valeur: any) => {
    //   Dispatch(setUser({ ...user, [champs]: "" }));
  };
  const confirm = (champs: string, valeur: any) => {
    //   Dispatch(setUser({ ...user, [champs]: "" }));
  };

  return (
    <>
      <SpeInputZoom
        id="Matricule"
        titre="Agent"
        value={{ code: user?.Matricule, libelle: "" }}
        type="MS"
        numero="MS067"
        params={`Matricule !='${user?.Matricule}'`}
        onChange={onchange}
        confirm={confirm}
        reset={reset}
        getLibelle={() => {
          return findLibelle(
            "Nom_Agent",
            "RH_Agent",
            `Matricule='${user?.Matricule}'`,
            ""
          );
        }}
      />
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
          <IonLabel>Nom</IonLabel>
          <IonInput placeholder={user.nom}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Prénom</IonLabel>
          <IonInput type="text" placeholder={user.prenom}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Adresse</IonLabel>
          <IonInput type="text" placeholder={user.prenom}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Ville</IonLabel>
          <IonInput type="text" placeholder={user.prenom}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Email</IonLabel>
          <IonInput type="email" placeholder={user.mail}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>GSM</IonLabel>
          <IonInput type="tel" placeholder={user.gsm}></IonInput>
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
    </>
  );
};

export default Fiche;
