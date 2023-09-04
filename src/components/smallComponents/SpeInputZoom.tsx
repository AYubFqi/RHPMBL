import { IonIcon } from "@ionic/react";
import { funnelOutline, funnelSharp } from "ionicons/icons";
import React, { useRef, useEffect, useState } from "react";
/* eslint-disable @typescript-eslint/no-empty-function */
import "./css/speInputZoom.scss";
import Zoom from "./Zoom";
interface propsF {
  id?: string;
  idLibelle?: string;
  className?: string;
  readonly?: boolean;
  titre?: string;
  value?: { code: string; libelle: string };
  type: "RPT" | "MS" | "QRY";
  reference?: string;
  numero: string;
  params?: any;
  valeurs?: any[];
  onChange?: any;
  confirm: any;
  reset: any;
  getLibelle?: any;
}
export interface cntx {
  showZoom: boolean;
  afficherZoom: (ouiNon: boolean) => void;
}
export const zoomContext = React.createContext<cntx>({
  showZoom: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  afficherZoom: (_ouiNon: boolean) => {},
});

const SpeInputZoom = (props: propsF) => {
  const spetitre = useRef<HTMLHeadingElement>(null);
  const speinput = useRef<HTMLInputElement>(null);
  const speCodeInput = useRef<HTMLInputElement>(null);
  const [showZoom, setShowZoom] = useState(false);
  const { value: valeur } = props;
  const [libelle, setLibelle] = useState(props.value?.libelle);
  const isLibelle = async () => {
    const lib = await props.getLibelle();
    setLibelle(lib);
  };
  const getFocus = () => {
    if (!spetitre.current?.classList.contains("hasvalue")) {
      spetitre.current?.classList.add("hasvalue");
      speinput.current?.classList.add("hasvalue");
    }
  };
  useEffect(() => {
    if (props.readonly || props.readonly === undefined) {
      speinput.current?.setAttribute("readonly", "true");
      speinput.current?.classList.remove("modifiable");
    } else {
      speinput.current?.classList.add("modifiable");
    }
    if (props.getLibelle != undefined) {
      isLibelle();
    }
    if (
      ((props.value?.code === "" || props.value?.code === undefined) &&
        props.readonly) ||
      (!props.readonly &&
        (props.value?.libelle === "" || props.value?.libelle === undefined))
    ) {
      spetitre.current?.classList.remove("hasvalue");
      speinput.current?.classList.remove("hasvalue");
    }
    if (props.value?.code || (!props.readonly && props.value?.libelle != "")) {
      !spetitre.current?.classList.contains("hasvalue") &&
        spetitre.current?.classList.add("hasvalue");
      !speinput.current?.classList.contains("hasvalue") &&
        speinput.current?.classList.add("hasvalue");
    }
  }, [props.value?.code]);
  const afficherZoom = (ouiNon: boolean) => {
    setShowZoom(ouiNon);
  };
  return (
    <>
      <div className="speROT">
        <h6 ref={spetitre} className="spetitre">
          {props.titre}
        </h6>
        <div className="contenuZoom">
          <input
            readOnly={props.readonly}
            ref={speinput}
            id={props.idLibelle ? props.idLibelle : `Libelle_${props.id}`}
            className={`speinput ${props.className || ""}`}
            value={props.getLibelle === undefined ? valeur?.libelle : libelle}
            onChange={(e) => {
              props.onChange(props.idLibelle, e.target.value);
            }}
            onFocus={getFocus}
            onBlur={(e) => {
              !e.target.value &&
                speinput.current?.classList.contains("hasvalue") &&
                speinput.current?.classList.remove("hasvalue");
              !e.target.value &&
                spetitre.current?.classList.contains("hasvalue") &&
                spetitre.current?.classList.remove("hasvalue");
            }}
          />
          <IonIcon
            id="zoomIcon"
            slot="end"
            md={funnelOutline}
            ios={funnelSharp}
            onClick={() => setShowZoom(true)}
          ></IonIcon>
          <input
            readOnly
            value={props.value?.code || ""}
            ref={speCodeInput}
            id={props.id}
            className="libZoom"
          />
        </div>
      </div>
      <zoomContext.Provider value={{ showZoom, afficherZoom }}>
        <Zoom
          refZoom={{
            id: props.id || "",
            type: props.type,
            reference: props.reference,
            numero: props.numero,
            params: props.params,
            valeurs: props.valeurs,
            confirm: props.confirm,
            reset: props.reset,
          }}
          estVisible={showZoom}
        />
      </zoomContext.Provider>
    </>
  );
};

export default SpeInputZoom;
