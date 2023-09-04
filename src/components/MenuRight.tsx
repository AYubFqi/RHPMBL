import "./smallComponents/css/menuRight.scss";
import Notifications from './../pages/Notifications'
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonNavLink,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  notifications
} from "ionicons/icons";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import FdrDetail from "../pages/FdrDetail";
import ShowEcran from "../pages/ShowEcran";
import Accueil from "./Accueil";
import Report from "../pages/Report";

export interface paramsF {
  type: string;
  name: string;
}
const MenuRight: React.FC = () => {
  const { name, type } = useParams<paramsF>();
  
 

  return (
    <IonPage id="MenuRight">
      
      <IonHeader id="menuHeader">
        <IonToolbar color="rayfirst">
          <IonButtons slot="start">
            <IonMenuButton color="raywhite" />
          </IonButtons>
          
          <IonButtons slot="end">
            <IonButton color="rayfirst"  >
              
              <IonNavLink
              id="notification-button"
                routerDirection="forward"
                component={() => <Notifications />}
              >
                <IonIcon 
                  color="light"
                  slot="end"
                  style={{fontSize:"1.5rem"}}
                  icon={notifications}
                ></IonIcon><IonBadge id="notifications-badge" color="danger">5</IonBadge>
              </IonNavLink>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {type === "fdr" && <FdrDetail />}
        {type === "accueil" && <Accueil />}
        {type != "fdr" && <ShowEcran />}
      </IonContent>
    </IonPage>
  );
};

export default MenuRight;
