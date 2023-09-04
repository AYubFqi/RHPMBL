import { IonCard, IonCardContent,IonCol, IonGrid, IonIcon,IonItem,IonNavLink,IonRow } from '@ionic/react'
import {  chevronForward } from 'ionicons/icons'
import React from 'react'
import notif from '../../css/img/notifications.svg'

interface notificationC {
    objet :string;
    message : string;
    lien : string;
  }

const NotificationCard :React.FC<notificationC> = ( {lien,objet,message}:notificationC) => {
  return (

     <IonCard >
      <IonGrid style={{ padding:"0" ,backgroundColor:"#d8e2dc"}} >
        <IonItem href={lien} >
          <IonRow style={{ padding:"0" ,backgroundColor:"#d8e2dc"}}>
            <IonCol size="2" style={{margin:"-0.5rem",paddingLeft:"1rem",backgroundColor:"white",color:"#e6f2ff"}}><div className="custom-icon"><img src={notif}></img></div></IonCol>
            <IonCol size="10" >
        <IonCardContent style={{ padding:" 0  0 0 1rem ",backgroundColor:"#d8e2dc"}}>
        <span style={{fontWeight:"bold",fontSize:"1rem"}}>{objet}</span>
          <p >{message}</p>
        </IonCardContent>
            </IonCol>
          </IonRow>
          </IonItem>
        </IonGrid>
    </IonCard>

    
  )
}

export default NotificationCard