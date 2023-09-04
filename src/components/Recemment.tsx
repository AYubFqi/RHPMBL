import { IonIcon } from "@ionic/react";
import {
  addOutline,
  chevronForward,
  folderOpenOutline,
  mailUnreadOutline
} from "ionicons/icons";
import React from "react";
import "./css/Accueil.scss";
const Recemment: React.FC = () => {
  return (
    
      <div className="recontainer">
      <div className="Recemcard">
        <IonIcon className="arrow" icon={chevronForward}></IonIcon>
          <IonIcon className="cardicon" icon={mailUnreadOutline}></IonIcon>
          <span className="cardtitle">Messagerie interne</span>
        </div>
        <div className="Recemcard">
          <IonIcon className="arrow" icon={chevronForward}></IonIcon>
          <IonIcon className="cardicon" icon={folderOpenOutline}></IonIcon>
          <span className="cardtitle">Demande de congé</span>
        </div>
        <div className="Recemcard">
          <IonIcon className="arrow" icon={chevronForward}></IonIcon>
          <IonIcon className="cardicon" icon={addOutline}></IonIcon>
          <span className="cardtitle">Ajouter</span>
        </div>
      </div>
    
  );
};

export default Recemment;
