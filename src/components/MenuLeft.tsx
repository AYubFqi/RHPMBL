import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
} from "@ionic/react";
import { useLocation } from "react-router-dom";
import {
  chevronForwardOutline,
  chevronForwardSharp,
  documentOutline,
  mailUnreadOutline,
  personOutline,
  powerOutline,
} from "ionicons/icons";
import { useRef } from "react";
import logo from "../css/img/logo.png";
import { useHistory } from "react-router";
import "./smallComponents/css/menuLeft.scss";
import Report from "../pages/Report";

const MenuLeft: React.FC = () => {
  const history = useHistory();
  const mnus = [
    {
      ecran: "Mes_demandes",
      text_ecran: "Mes demandes et documents",
      typ_ecran: "",
      url: "",
      parent: "",
      img: "",
      visible: false,
      actif: false,
      rang: 0,
    },
    {
      ecran: "Consultations",
      text_ecran: "Consultations",
      typ_ecran: "",
      url: "",
      parent: "",
      img: "",
      visible: false,
      actif: false,
      rang: 0,
    },
    {
      ecran: "MesEvaluations",
      text_ecran: "Mes évaluations",
      typ_ecran: "",
      url: "",
      parent: "",
      img: "",
      visible: false,
      actif: false,
      rang: 0,
    },
    {
      ecran: "Formations",
      text_ecran: "Formations",
      typ_ecran: "",
      url: "",
      parent: "",
      img: "",
      visible: false,
      actif: false,
      rang: 0,
    },
  ];

  const fdrs = [
    {
      ecran: "Bulletin de paie",
      text_ecran: "Bulletin de paie",
      typ_ecran: "",
      url: "",
      parent: "Mes editions",
      img: "",
      visible: false,
      actif: false,
      rang: 0,
    },
    {
      ecran: "Fiche de poste",
      text_ecran: "Fiche de poste",
      typ_ecran: "",
      url: "",
      parent: "Mes editions",
      img: "",
      visible: false,
      actif: false,
      rang: 0,
    },
    {
      ecran: "Attestation de travail",
      text_ecran: "Attestation de travail",
      typ_ecran: "",
      url: "",
      parent: "Mes editions",
      img: "",
      visible: false,
      actif: false,
      rang: 0,
    },
    {
      ecran: "Attestation de salaire",
      text_ecran: "Attestation de salaire",
      typ_ecran: "",
      url: "",
      parent: "Mes editions",
      img: "",
      visible: false,
      actif: false,
      rang: 0,
    },
    {
      ecran: "Modèle de contrat",
      text_ecran: "Fiche de poste",
      typ_ecran: "",
      url: "",
      parent: "Mes editions",
      img: "",
      visible: false,
      actif: false,
      rang: 0,
    },
    {
      ecran: "Demande_d_avance",
      text_ecran: "Demande d'avance",
      typ_ecran: "",
      url: "",
      parent: "Mes_demandes",
      img: "",
      visible: false,
      actif: false,
      rang: 0,
    },
    {
      ecran: "Demande de prêt",
      text_ecran: "Demande de prêt",
      typ_ecran: "",
      url: "",
      parent: "Mes_demandes",
      img: "",
      visible: false,
      actif: false,
      rang: 0,
    },
    {
      ecran: "Demande de congé",
      text_ecran: "Demande de congé",
      typ_ecran: "",
      url: "",
      parent: "Mes_demandes",
      img: "",
      visible: false,
      actif: false,
      rang: 0,
    },
    {
      ecran: "DossierMaladie",
      text_ecran: "Dossiers de maladie",
      typ_ecran: "",
      url: "",
      parent: "Mes_demandes",
      img: "",
      visible: false,
      actif: false,
      rang: 0,
    },
    {
      ecran: "bulletinsDePaie",
      text_ecran: "Edition de bulletins de paie",
      typ_ecran: "",
      url: "",
      parent: "Consultations",
      img: "",
      visible: false,
      actif: false,
      rang: 0,
    },
    {
      ecran: "onMevalue",
      text_ecran: "On m'évalue",
      typ_ecran: "",
      url: "",
      parent: "MesEvaluations",
      img: "",
      visible: false,
      actif: false,
      rang: 0,
    },
    {
      ecran: "jEvalue",
      text_ecran: "J'évalue",
      typ_ecran: "",
      url: "",
      parent: "MesEvaluations",
      img: "",
      visible: false,
      actif: false,
      rang: 0,
    },
    {
      ecran: "MesFormations",
      text_ecran: "Mes Formations",
      typ_ecran: "",
      url: "",
      parent: "Formations",
      img: "",
      visible: false,
      actif: false,
      rang: 0,
    },
    
  ];

  const location = useLocation();
  const mainMenu = useRef<HTMLIonMenuElement>(null);
  return (
    <IonMenu
      id="MainMenu"
      swipeGesture={false}
      contentId="MenuRight"
      type="overlay"
      ref={mainMenu}
    >
      <IonContent style={{ margin: 0 }}>
        <IonList id="inbox-list" style={{ margin: "-9px", padding: 0 }}>
          <div className="logoMenus">
            <img
              src={logo}
              onClick={() => {
                mainMenu.current?.close();
                history.push("/page/accueil/dash");
              }}
            />
            <span className="paiespan">De la paie à la gestion des talents</span>
          </div>
          <IonList  style={{ margin: "0rem" }}>
          <IonItem
            slot="end"
            onClick={() => {
              history.push("/MaFiche");
            }}
          >
            <IonIcon
              color="rayfirst"
              icon={personOutline}
              style={{ marginLeft: "0.7rem" }}
            ></IonIcon>
            <IonLabel style={{ paddingLeft: "0.7rem" }} color="rayfirst">
              {" "}
              Ma Fiche
            </IonLabel>
          </IonItem>
          <IonItem slot="end">
            <IonIcon
              color="rayfirst"
              icon={documentOutline}
              style={{ marginLeft: "0.7rem" }}
              onClick={() => {
                history.push("/messagerie");
              }}
            ></IonIcon>
            <IonLabel style={{ paddingLeft: "0.7rem" }} color="rayfirst">
              {" "}
              Ma fiche de poste
            </IonLabel>
          </IonItem>
          
        </IonList>
          {/* <hr /> */}
          <IonAccordionGroup>
            {mnus?.map((mnu, index) => {
              return (
                <IonAccordion value={mnu.ecran} key={index}>
                  <>
                    <IonItem
                      style={{ paddingLeft: "0.5em" }}
                      className={
                        location.pathname === `/page/${mnu.url}`
                          ? "selected"
                          : ""
                      }
                      slot="header"
                    >
                      {/* <IonIcon style ={{margin:" 0 0.5em" }} color="rayfirst" icon={folderOpenOutline}></IonIcon> */}
                      {/* <IonIcon style ={{margin:" 0 0.5em" }} slot="start" icon={mnu.img}  /> */}
                      <IonLabel color="rayfirst" id={mnu.ecran}>
                        {mnu.text_ecran}
                      </IonLabel>
                    </IonItem>
                  </>
                  {fdrs
                    ?.filter((fr) => fr.parent === mnu.ecran)
                    .sort((a, b) => a.rang - b.rang)
                    .map((i, k) => (
                      <div key={k} className="ion-padding fdr" slot="content">
                        <p
                          className="menuGauche"
                          onClick={() => {
                            mainMenu.current?.close();
                            if(i.ecran=="Bulletin de paie"){
                             history.push('/repport/Bulletin de paie')
                            }
                          }}
                        >
                          {i.text_ecran}
                        </p>
                        {i.typ_ecran === "fdr" && (
                          <IonIcon
                            slot="end"
                            ios={chevronForwardSharp}
                            md={chevronForwardOutline}
                          />
                        )}
                      </div>
                    ))}
                </IonAccordion>
              );
            })}
          </IonAccordionGroup>
        </IonList>
        <div className="dec-container">
        <IonList lines="none" style={{ marginTop: "auto" }}>

<IonItem
  slot="end"
  onClick={() => {
    history.push("/");
  }}
>
  <IonIcon
    color="danger"
    icon={powerOutline}
    style={{ marginLeft: "0.7rem" }}
  ></IonIcon>
  <IonLabel
    style={{ paddingLeft: "0.7rem", fontWeight: "500" }}
    color="danger"
  >
    {" "}
    Me deconnecter
  </IonLabel>
</IonItem>
</IonList>
        </div>
        
      </IonContent>
    </IonMenu>
  );
};

export default MenuLeft;
