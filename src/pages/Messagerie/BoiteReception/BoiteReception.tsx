import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonList,
  IonModal,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import {
  chevronBack,
  chevronUpCircleOutline,
  mailOpenOutline,
  mailOutline,
  mailUnreadOutline,
  optionsOutline,
  pencilOutline,
  searchOutline,
  sendOutline,
  trashOutline,
} from "ionicons/icons";
import { createContext, useEffect, useRef, useState } from "react";
import { dataMsgF, filtreF, initialState } from "./__interfaces";
import "./css/boitereception.scss";
import OpenMail from "./OpenMail";

export const myCntxt = createContext<{
  toDo?: "ecrire" | "lire" | "repondre";
  setToDo?: any;
  setIsOpen?: any;
  Request?: any;
  modal?: any;
  filtre?: filtreF;
  setFiltre?: any;
  setSubDataMsg?: any;
}>({});
const BoiteReception = () => {
  const [search, setSearch] = useState("");
  const modal = useRef<HTMLIonModalElement>(null);
  const fabB = useRef<HTMLIonFabElement>(null);
  const [filtre, setFiltre] = useState<filtreF>(initialState);
  const [dataMsg, setDataMsg] = useState<dataMsgF[]>([]);

  const [showLoading, setShowLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [boite, setBoite] = useState<"inbox" | "sent" | "trash">("inbox");
  const [idMsg, setIdMsg] = useState(-1);
  const [toDo, setToDo] = useState<"ecrire" | "lire" | "repondre">("lire");
 const messagedata = [
  {
    id_msg: 1,
  lu: false,
  alerted: true,
  dat_msg: "21/06/2023",
  lien: "#",
  objet: "Relevé d'heures supplémentaires",
  msg: "as-tu reçu ton relevé d'heures supplémentaires ce mois-ci ? J'aimerais vérifier si tout est en ordre. Merci !",
  id_sender: 1,
  sender: "",
  attn: ""
  },{
    id_msg: 1,
  lu: true,
  alerted: true,
  dat_msg: "21/06/2023",
  lien: "#",
  objet: "Demande de clarification sur les avantages sociaux",
  msg: " j'ai quelques questions sur nos avantages sociaux. Peux-tu m'éclairer sur les détails de la couverture médicale ? Merci d'avance !",
  id_sender: 1,
  sender: "",
  attn: ""
  },{
    id_msg: 1,
  lu: false,
  alerted: true,
  dat_msg: "21/06/2023",
  lien: "#",
  objet: "Demande de congé",
  msg: " je voulais te demander si je pouvais prendre quelques jours de congé la semaine prochaine",
  id_sender: 1,
  sender: "",
  attn: ""
  },{
    id_msg: 1,
  lu: true,
  alerted: true,
  dat_msg: "21/06/2023",
  lien: "#",
  objet: "Augmentation de salaire",
  msg: "j'ai récemment obtenu une promotion et je voulais savoir si cela s'accompagne d'une augmentation de salaire",
  id_sender: 1,
  sender: "",
  attn: ""
  },{
    id_msg: 1,
  lu: true,
  alerted: true,
  dat_msg: "21/06/2023",
  lien: "#",
  objet: " Formation à venir",
  msg: "as-tu entendu parler de la formation sur les compétences en leadership qui aura lieu le mois prochain ?",
  id_sender: 1,
  sender: "",
  attn: ""
  }
]
const [subDataMsg, setSubDataMsg] = useState<dataMsgF[]>(messagedata);
  const generateItems = () => {
    const fromRow = subDataMsg.length - 1;
    if (
      fromRow >= dataMsg?.length ||
      !Array.isArray(dataMsg) ||
      dataMsg.length === 0
    )
      return;
    if (dataMsg.length <= 20) {
      setSubDataMsg([...dataMsg]);
      return;
    }
    const toRow = Math.min(fromRow + 20, dataMsg.length - 1);
    let dtNew = [...dataMsg].splice(fromRow + 1, toRow);
    if (fromRow > 0) {
      dtNew = [...subDataMsg, ...dtNew];
    }
    setSubDataMsg([...dtNew]);
  };
  useEffect(() => {
    if (!showLoading) generateItems();
  }, [showLoading]);
 
  return (
    <div id="mailBox" style={{ width: "100vw", height: "100vh" }}>
      <IonToolbar style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
          }}
        >
          <IonButtons slot="start">
            <IonBackButton
              icon={chevronBack}
              text="Retour"
              defaultHref="/page/accueil/dash/"
            ></IonBackButton>
          </IonButtons>
          <h5 style={{ paddingRight: "15px" }}>
            {boite === "trash"
              ? "Corbeille"
              : boite === "sent"
              ? "Boîte d'envoi"
              : "Boîte de récéption"}
          </h5>
        </div>
        <div className="searching">
          <IonIcon
            icon={searchOutline}
            style={{
              fontSize: "1.5em",
              margin: "auto",
              color: search ? "var(--CouleurRay2)" : "gray",
            }}
          />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSubDataMsg(
                e.target.value
                  ? [...dataMsg].filter(
                      (dt) =>
                        dt.sender
                          .toLowerCase()
                          .includes(e.target.value.toLocaleLowerCase()) ||
                        dt.objet
                          .toLowerCase()
                          .includes(e.target.value.toLocaleLowerCase()) ||
                        dt.msg
                          .toLowerCase()
                          .includes(e.target.value.toLocaleLowerCase())
                    )
                  : [...dataMsg]
              );
            }}
          />
          <IonIcon
            icon={optionsOutline}
            style={{
              fontSize: "1.5em",
              margin: "auto",
              color:
                filtre.id_sender > 0 ||
                filtre.id_attn.length > 0 ||
                filtre.dat_deb !== "" ||
                filtre.dat_fin !== "" ||
                filtre.objet.trim() !== ""
                  ? "var(--CouleurRay2)"
                  : "gray",
            }}
            id="filtre"
          />
        </div>
      </IonToolbar>
      <IonContent>
      

        <IonList style={{ width: "130%" }}>
          {subDataMsg.map((g: dataMsgF, i: number) => {
            return (
              <IonItem
                key={i}
                style={{
                  borderBottom: "1px dashed var(--Couleur)",
                  width: "100%",
                }}
                onClick={() => {
                  setIsOpen(true);
                  setIdMsg(g.id_msg);
                }}
              >
                <IonGrid>
                  <IonRow>
                    <IonCol
                      size="1.25"
                      style={{
                        transform: "translateX(-0.5em)",
                        padding: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: `var(--Couleur${g.lu ? "Ray1" : "Ray2"})`,
                      }}
                    >
                      <IonIcon
                        style={{ fontSize: "2em" }}
                        icon={
                          g.lu === true ? mailOpenOutline : mailUnreadOutline
                        }
                      ></IonIcon>
                    </IonCol>
                    <IonCol
                      style={{
                        maxWidth: "79vw",
                        fontSize: ".8em",
                        backgroundColor: g.lu
                          ? "rgba(230,230,230,0.6)"
                          : "var(--CouleurInputActive)",
                      }}
                    >
                      <IonRow>
                        <IonCol style={{ padding: "5px 0", textAlign: "left" }}>
                          {boite === "sent" ? " A :" : " De :"}
                          <span style={{ fontWeight: "bold" }}>{g.sender}</span>
                        </IonCol>
                        
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          <div
                            style={{
                              textOverflow: "ellipsis",
                              width: "100%",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {g.objet}
                          </div>
                          <div
                            style={{
                              textOverflow: "ellipsis",
                              width: "100%",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                           
                          </div>
                        </IonCol>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            );
          })}
        </IonList>
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            generateItems();
            setTimeout(() => ev.target.complete(), 500);
          }}
        >
          <IonInfiniteScrollContent
            loadingText="Merci de patienter..."
            loadingSpinner="bubbles"
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
      <IonFab
        ref={fabB}
        slot="fixed"
        vertical="bottom"
        horizontal="end"
        style={{ position: "fixed" }}
      >
        <IonFabButton>
          <IonIcon icon={chevronUpCircleOutline}></IonIcon>
        </IonFabButton>
        <IonFabList side="top" id="cltFab">
          <IonFabButton
            onClick={() => {
              setBoite("inbox");
            }}
          >
            <IonIcon icon={mailOutline}></IonIcon>
          </IonFabButton>
          <IonFabButton
            onClick={() => {
              setBoite("sent");
            }}
          >
            <IonIcon icon={sendOutline}></IonIcon>
          </IonFabButton>
          <IonFabButton
            onClick={() => {
              setBoite("trash");
            }}
          >
            <IonIcon icon={trashOutline}></IonIcon>
          </IonFabButton>
          <IonFabButton
            onClick={() => {
              setToDo("ecrire");
              setIsOpen(true);
            }}
          >
            <IonIcon icon={pencilOutline}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
      <myCntxt.Provider
        value={{
          toDo,
          setToDo,
          setIsOpen,
          Request,
          filtre,
          modal,
          setFiltre,
          setSubDataMsg,
        }}
      >
        <OpenMail isOpen={isOpen} id_msg={toDo === "ecrire" ? -1 : idMsg} />{" "}
        <IonModal id="example-modal" ref={modal} trigger="filtre">
       
        </IonModal>
      </myCntxt.Provider>
    </div>
  );
};

export default BoiteReception;
