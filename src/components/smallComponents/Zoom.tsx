import { IonContent, IonIcon, IonModal, IonSearchbar } from "@ionic/react";
import { trashOutline, trashSharp } from "ionicons/icons";
import "./css/zoom.scss";
import { useEffect, useRef, useState, useContext } from "react";
import { zoomContext, cntx } from "./SpeInputZoom";
import { myAxios } from "../../config/config";
interface refZoomF {
  id: string;
  type: "RPT" | "MS" | "QRY";
  reference?: string;
  numero: string;
  params?: string[];
  valeurs?: any[];
  confirm?: any;
  reset?: any;
}
interface propsFrm {
  estVisible: boolean;
  refZoom: refZoomF;
}
const Zoom = ({ estVisible, refZoom }: propsFrm) => {
  const searchInput = useRef<HTMLIonSearchbarElement>(null);
  const [zoomData, setZoomData] = useState([]);
  const [search, setSearch] = useState("");
  const myContext = useContext<cntx>(zoomContext);
  const modal = useRef<HTMLIonModalElement>(null);
  useEffect(() => {
    if (myContext.showZoom) {
      searchInput.current?.focus();
      setSearch("");
      myAxios(`${refZoom.type === "RPT" ? "rpt" : ""}zoom`, {
        report: refZoom.reference,
        rang: refZoom.numero,
        criteres: refZoom.params,
        valeurs: refZoom.valeurs,
        numZoom: refZoom.numero,
        condition: refZoom.params,
      })
        .then((data) => {
          setZoomData(data.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [myContext.showZoom]);

  return (
    <IonModal
      ref={modal}
      isOpen={estVisible}
      initialBreakpoint={0.75}
      // backdropDismiss={false}
      breakpoints={[0, 0.25, 0.5, 0.75]}
      onDidDismiss={() => {
        myContext.afficherZoom(false);
      }}
    >
      {" "}
      <div id="zoomGrd">
        {" "}
        <div id="chercher">
          <IonSearchbar
            ref={searchInput}
            onClick={() => modal.current?.setCurrentBreakpoint(0.75)}
            onIonChange={(e) => setSearch(e.detail.value || "")}
            value={search}
            placeholder="Rechercher"
          ></IonSearchbar>
          <IonIcon
            md={trashOutline}
            ios={trashSharp}
            slot="end"
            style={{ marginRight: "5px" }}
            onClick={() => {
              refZoom.reset(refZoom.id);
              myContext.afficherZoom(false);
            }}
          ></IonIcon>
        </div>
        <IonContent className="ion-padding">
          <div id="zoomList">
            {zoomData
              .filter(
                (dt) =>
                  (dt[Object.keys(dt)[1]] as string)
                    .toString()
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  (dt[Object.keys(dt)[0]] as string)

                    .toString()
                    .toLowerCase()
                    .includes(search.toString().toLowerCase())
              )
              .map((rw, k) => (
                <div
                  key={k}
                  className="zoomGrdRows"
                  onClick={() => {
                    refZoom.confirm(
                      refZoom.id,
                      rw[Object.keys(rw)[0]],
                      rw[Object.keys(rw)[1]]
                    );
                    myContext.afficherZoom(false);
                  }}
                >
                  <h6>{rw[Object.keys(rw)[1]]}</h6>
                  <p>{rw[Object.keys(rw)[0]]}</p>
                </div>
              ))}
          </div>
        </IonContent>
      </div>
    </IonModal>
  );
};

export default Zoom;
