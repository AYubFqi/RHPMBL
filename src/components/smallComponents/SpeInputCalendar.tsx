import { IonIcon } from "@ionic/react";
import { calendarNumberOutline, calendarNumberSharp } from "ionicons/icons";
import React, { useRef, useEffect, useState } from "react";
import "./css/speInputCalendar.scss";
import ZoomCalendar from "./ZoomCalendar";

export interface cntx {
  showCalendar: boolean;
  afficherCalendar: (ouiNon: boolean) => void;
}

export const CalendarContext = React.createContext<cntx>({
  showCalendar: false,
  afficherCalendar: (_ouiNon: boolean) => {},
});

interface propsF {
  id: string;
  className?: string;
  titre?: string;
  value: string;
  reset?: any;
  confirm?: any;
}

const SpeInputCalendar = (props: propsF) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const spetitre = useRef<HTMLHeadingElement>(null);
  const speinput = useRef<HTMLInputElement>(null);
  const { value: valeur } = props;
  useEffect(() => {
    valeur === "" && spetitre.current?.classList.remove("hasvalue");
    valeur != "" &&
      !spetitre.current?.classList.contains("hasvalue") &&
      spetitre.current?.classList.add("hasvalue");
  }, [valeur]);

  const onclick = () => {
    setShowCalendar(true);
  };

  const afficherCalendar = (ouiNon: boolean) => {
    setShowCalendar(ouiNon);
  };
  
  return (
    <>
      <div className="speDat">
        <h6 ref={spetitre} className="spetitre">
          {props.titre}
        </h6>
        <div className="contenuZoom">
          <input
            value={valeur}
            ref={speinput}
            id={props.id}
            className={`speinput ${props.className || ""}`}
            readOnly
          />
          <IonIcon
            slot="end"
            md={calendarNumberOutline}
            ios={calendarNumberSharp}
            onClick={onclick}
          ></IonIcon>
        </div>
      </div>
      <CalendarContext.Provider value={{ showCalendar, afficherCalendar }}>
        <ZoomCalendar
          value={valeur}
          id="maDate"
          confirm={props.confirm}
          reset={props.reset}
        />
      </CalendarContext.Provider>
    </>
  );
};

export default SpeInputCalendar;
