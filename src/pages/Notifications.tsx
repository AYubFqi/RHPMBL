import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import "./../css/notifications.scss";
import React, { useEffect, useState } from "react";
import {
  calendar,
  chevronBack,
  settingsOutline,
  settingsSharp
} from "ionicons/icons";
import NotificationCard from "../components/smallComponents/NotificationCard";

import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Toast } from "@capacitor/toast";

import { LocalNotifications } from '@capacitor/local-notifications';



LocalNotifications.addListener('localNotificationActionPerformed', (payload) => {
  // triggers when the notification is clicked.
  console.log('notification triggered:', payload);
});


const Notification: React.FC = () => {
  const user = useSelector((state: RootState) => state.User.user);
  const [Msgbox, dismiss] = useIonAlert();
  const nullEntry: any[] = []
  const [notifications, setnotifications] = useState(nullEntry);
  
  let myDate:string 
  const checkDate = (date : string) => {
    if(date === myDate)
    {return false;}
    else {
    myDate = date;
    return true}
  }

// const register = () => {
//   console.log('Initializing HomePage');


//   PushNotifications.register();

//   PushNotifications.addListener('registration',
//       (token: Token) => {
//          LocalNotifications.schedule({
//           notifications: [
//             {
//               title: "title",
//               body: "body",
//               id: new Date().getTime(),
//               schedule: { at: new Date(Date.now()) },
//               sound: "beep.caf",
//               actionTypeId: 22/06/2023,
//             }
//           ]
//         });
//       }
//   );

//   PushNotifications.addListener('registrationError',
//       (error: any) => {
//           alert('Error on registration: ' + JSON.stringify(error));
//       }
//   );

//   // Show us the notification payload if the app is open on our device
//   PushNotifications.addListener('pushNotificationReceived',
//       (notification: PushNotificationSchema) => {
//         setnotifications(notifications => [ ...notifications, { id: notification.id, title: notification.title, body: notification.body, type: 'foreground' }])
//       }
//   );

//   // Method called when tapping on a notification
//   PushNotifications.addListener('pushNotificationActionPerformed',
//       (notification: ActionPerformed) => {
//         setnotifications(notifications => [...notifications, { id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body, type: 'action' }])
//       }
//   );
// }

const showToast = async (msg: string) => {
  await Toast.show({
      text: msg
  })
}


  
  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            icon={chevronBack}
            text="fermer"
            defaultHref="/page/accueil/dash/"
          ></IonBackButton>
        </IonButtons>
        <IonButton style={{ marginLeft: "9rem"}} ><IonIcon
          slot="end"
          style={{ marginRight: "1rem", fontSize: "1.8rem" }}
          md={settingsOutline}
          ios={settingsSharp}
        ></IonIcon></IonButton>
        
      </IonToolbar>
      <IonContent>
        <div className="vl"></div>
                <div >
                    <IonChip
                      color="medium"
                      style={{
                        marginLeft: "0.8rem",
                        marginTop: "0.8rem",
                        zIndex: "100",
                      }}
                    >
                      <IonIcon color="medium" icon={calendar}></IonIcon>
                      <IonLabel>22/06/2023</IonLabel>
                    </IonChip>
                 
                  <NotificationCard
                    lien="#"
                    objet= "Nouvelle fiche de paie disponible"
                    message="Nous sommes heureux de vous informer que votre nouvelle fiche de paie pour le mois de ..." 
                  />
                </div>
                <div >
                    <IonChip
                      color="medium"
                      style={{
                        marginLeft: "0.8rem",
                        marginTop: "0.8rem",
                        zIndex: "100",
                      }}
                    >
                      <IonIcon color="medium" icon={calendar}></IonIcon>
                      <IonLabel>21/06/2023</IonLabel>
                    </IonChip>
                 
                  <NotificationCard
                    lien="#"
                    objet= "Rappel de demande de congé"
                    message="Ceci est un rappel amical concernant votre demande de congé prévue pour la période du..." 
                  />
                  <NotificationCard
                    lien="#"
                    objet= "Évaluation de performance"
                    message="Nous tenons à vous rappeler qu'il est temps de compléter votre évaluation de performance pour l'année en cours..." 
                  />
                </div>
                <div >
                    <IonChip
                      color="medium"
                      style={{
                        marginLeft: "0.8rem",
                        marginTop: "0.8rem",
                        zIndex: "100",
                      }}
                    >
                      <IonIcon color="medium" icon={calendar}></IonIcon>
                      <IonLabel>20/06/2023</IonLabel>
                    </IonChip>
                 
                  <NotificationCard
                    lien="#"
                    objet= "Programme de formation à venir"
                    message="Nous sommes ravis de vous informer qu'un nouveau programme de formation a été planifié pour renforcer vos compétences professionnelles..." 
                  />
                  <NotificationCard
                    lien="#"
                    objet= "Évaluation de performance"
                    message="Nous tenons à vous rappeler qu'il est temps de compléter votre évaluation de performance pour l'année en cours..." 
                  />
                </div>
      </IonContent>
    </IonPage>
  );
};
export default Notification;
