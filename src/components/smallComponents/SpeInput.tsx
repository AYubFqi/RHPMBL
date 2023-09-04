import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React, { useState, useRef, useEffect, ReactNode, Children } from "react";
import { controleInjection, getRegexPattern } from "../../config/config";
import "./css/speInput.scss";

interface Props {
  style?: any;
  children?: ReactNode;
  id?: string;
  className?: string;
  titre?: string;
  value?: any;
  type?: "text" | "number" | "date" | "datetime" | "time" | "tel" | "email";
  onChange?: any;
  onClick?: any;
  readonly?: boolean;
}

const SpeInput = (props: Props) => {

  const spetitre = useRef<HTMLHeadingElement>(null);
  const speinput = useRef<HTMLInputElement>(null);
  const { value: valeur } = props;
  const getFocus = () => {
    if (!spetitre.current?.classList.contains("hasvalue")) {
      spetitre.current?.classList.add("hasvalue");
      speinput.current?.classList.add("hasvalue");
    }
  };

  useEffect(() => {
    if (!getRegexPattern(props.type || "").test(valeur)) {
      !speinput.current?.classList.contains("erreur") &&
        speinput.current?.classList.add("erreur");
    } else {
      speinput.current?.classList.contains("erreur") &&
        speinput.current?.classList.remove("erreur");
    }
    if (!valeur) {
      spetitre.current?.classList.remove("hasvalue");
      speinput.current?.classList.remove("hasvalue");
      speinput.current?.classList.remove("erreur");
    } else {
      !spetitre.current?.classList.contains("hasvalue") &&
        spetitre.current?.classList.add("hasvalue");
      !speinput.current?.classList.contains("hasvalue") &&
        speinput.current?.classList.add("hasvalue");
    }
  }, [props.value]);

  return (
    <div className="speInput" onFocus={getFocus}>
      <h6
        style={{ zIndex: "999" }}
        ref={spetitre}
        className="spetitre"
        onFocus={getFocus}
      >
      {props.titre}
      </h6>
      <IonGrid>
        <IonRow>
          <IonCol size="10">
            <input
              ref={speinput}
              id={props.id}
              type={props.type}
              className={`speinput ${props.className || ""} ${
                props.type === "number" ? " nombre" : ""
              }`}
              readOnly={props.readonly}
              value={props.value}
              onClick={props.onClick}
              onFocus={getFocus}
              onChange={(e) => {
                props.onChange(props.id, e.target.value);
              }}
              onBlur={(e) => {
                !e.target.value &&
                  speinput.current?.classList.contains("hasvalue") &&
                  speinput.current?.classList.remove("hasvalue");
                !e.target.value &&
                  spetitre.current?.classList.contains("hasvalue") &&
                  spetitre.current?.classList.remove("hasvalue");
              }}
            />
          </IonCol>
          <IonCol size="2" style={{ ...props.style }}>
            {Array(props.children)}
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default SpeInput;
