import { useEffect, useState } from "react";
import { Filesystem } from '@capacitor/filesystem';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { chevronBack, printOutline, printSharp } from "ionicons/icons";

import "../css/report.scss";
import { useParams } from "react-router";
import { Capacitor } from "@capacitor/core";

interface propsF {
  name: string;
}


const Report = () => {
  const param :propsF= useParams();
  const name = param.name
   return (
    <IonPage >
    <IonHeader >
      <IonToolbar color="rayfirst">
      <IonButtons slot="start">
            <IonBackButton
              icon={chevronBack}
              defaultHref="/page/accueil/dash/"
            ></IonBackButton>
          </IonButtons>
      <IonTitle style={{marginLeft:"1em"}} slot="start" color="raywhite" size="small">
      Bulletin de paie
          </IonTitle>
    </IonToolbar>
    </IonHeader>
    <div id="crReport">
      <IonButton style={{buttom:"2rem"}}
        className="visualiser"
        color="rayfirst"
        onClick={() => {
          if(name=="Bulletin de paie"){
            if (Capacitor.isPluginAvailable('StatusBar')) {
              Filesystem.readFile({
                path: '../../public/assets/F00001-P25-202306.pdf',
              }).then(()=>console.log(`file opened`)).catch(()=>{
                console.log('erro file')
              });
          }
          }
        }}
      >
        Visualiser
        <IonIcon slot="end" md={printOutline} ios={printSharp}></IonIcon>
      </IonButton>
    </div>
    </IonPage>
  );
};

export default Report;
