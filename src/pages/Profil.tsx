import {
    IonBackButton,
    IonBadge,
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
  import { Buffer } from "buffer";
  import {
    cameraOutline,
    cameraSharp,
    caretBack,
    chevronBack,
    ellipsisHorizontal,
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
  import { Camera, CameraResultType } from '@capacitor/camera';
 
  
  const Profil: React.FC = () => {
    const user = useSelector((state: RootState) => state.User.user);
    const [dataImg, setDataImg] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [Msgbox, dismiss] = useIonAlert();
    const Dispatch = useDispatch();
    const artImages = (visible: boolean) => {
      return (
        <div style={{ display: visible ? "" : "none" }}>
          {dataImg != undefined ? (
            <SpePictureBox id="img" img='../css/img/Profil.png' alt="image" />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
    };
    const convertToBase64 = (url :any)  => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          const reader = new FileReader();
          reader.onloadend = function() {
            resolve(reader.result);
          }
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
      });
      
    }
    const enregistrerImage = async () => {
    try{
      const image = await Camera.getPhoto({
        quality: 20,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });
      const dataPath :any = await convertToBase64(image.webPath);
      setDataImg(dataPath);
      await myAxios(`UserphotoUpload`, {
        img: dataPath,
        Matricule: user.Matricule,
      })
        .then((data) => {
          const result = data.data.result;
          if(!result)
          Msgbox({
            header: "Photo de Profile",
            message: "impossible d'enregistrer l'image dans la base de données",
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
  
    }catch{
      return false
    }
    } 
      
    
    const saveUserUpdates = async() => {
      await myAxios(`updateUser`, {
        user: user,
      })
        .then((data) =>{Msgbox({
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
        })} )
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
    }
  
    
    useEffect(() => {
      const loadimg = async () => {
      
        await myAxios(`Userphoto`, {
          Matricule: user.Matricule,
        })
          .then((data) => {
            const buffer = 'data:image/png;base64,' +data.data.data;
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
      <IonPage>
        <IonHeader>
          <IonToolbar color="rayfirst">
          <IonButtons slot="start">
            <IonBackButton
              icon={chevronBack}
              text="Retour"
              defaultHref="/page/accueil/dash/"
            ></IonBackButton>
          </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>
                <IonLabel>
                  <span>Collaborateur :AHMEDI</span> ZAKARIA
                </IonLabel>
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonCardTitle>
              {artImages(isLoading)}
                <IonFab vertical="bottom" horizontal="end">
                  <IonFabButton size="small" color="light" onClick={()=> enregistrerImage()}>
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
              <IonBadge color="danger">5</IonBadge>
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
              <IonInput placeholder="AHMEDI" 
              
                  ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Prénom</IonLabel>
              <IonInput type="text" placeholder="ZAKARIA" 
              
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Email</IonLabel>
              <IonInput type="email" placeholder="z.ahmadi@metafy.soluions"
              
                ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>GSM</IonLabel>
              <IonInput type="tel" placeholder="0661789587"
              
                ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Tel</IonLabel>
              <IonInput type="tel" placeholder="0567789822"
             
                ></IonInput>
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
  
  export default Profil;
  