import { IonTextarea } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import "./css/spetextarea.scss";
interface propsF {
  id: string;
  placeholder?: string;
  autoGrow?: boolean;
  value: string;
  onChange?: any;
}
const SpeTextArea = ({
  id,
  placeholder,
  autoGrow,
  value,
  onChange,
}: propsF) => {
  const spetitre = useRef<HTMLHeadingElement>(null);
  const speinput = useRef<HTMLIonTextareaElement>(null);
  const getFocus = () => {
    if (!spetitre.current?.classList.contains("hasvalue")) {
      spetitre.current?.classList.add("hasvalue");
      speinput.current?.classList.add("hasvalue");
    }
  };
  useEffect(() => {
    if (!value) {
      spetitre.current?.classList.remove("hasvalue");
      speinput.current?.classList.remove("hasvalue");
      speinput.current?.classList.remove("erreur");
    } else {
      !spetitre.current?.classList.contains("hasvalue") &&
        spetitre.current?.classList.add("hasvalue");
      !speinput.current?.classList.contains("hasvalue") &&
        speinput.current?.classList.add("hasvalue");
    }
  }, [value]);
  return (
    <div id="speTextArea" onFocus={getFocus}>
      <h6 ref={spetitre} className="spetitre" onFocus={getFocus}>
        {placeholder}
      </h6>
      <IonTextarea
        id={id}
        className="TxtArea"
        ref={speinput}
        autoGrow={autoGrow || true}
        value={value || ""}
        onFocus={getFocus}
        onIonChange={(e) => onChange(id, e.detail.value)}
        onBlur={(e) => {
          !e.target.value &&
            speinput.current?.classList.contains("hasvalue") &&
            speinput.current?.classList.remove("hasvalue");
          !e.target.value &&
            spetitre.current?.classList.contains("hasvalue") &&
            spetitre.current?.classList.remove("hasvalue");
        }}
      ></IonTextarea>
    </div>
  );
};

export default SpeTextArea;
