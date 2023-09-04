import { IonButton, IonButtons, IonDatetime, IonModal } from "@ionic/react";
import { useContext, useRef } from "react";
import { format, parseISO, parse } from "date-fns";
import "./css/zoomCalendar.scss";
import { cntx, CalendarContext } from "./SpeInputCalendar";
interface propsF {
  id: string;
  value: string;
  confirm: any;
  reset: any;
}
const ZoomCalendar = (props: propsF) => {
  const datetime = useRef<null | HTMLIonDatetimeElement>(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const myContext = useContext<cntx>(CalendarContext);
  const getSelectedDate = () => {
    const dateFromIonDatetime = Array.isArray(datetime.current?.value)
      ? datetime.current?.value[0]
      : datetime.current?.value || "";
    return format(parseISO(dateFromIonDatetime || ""), "dd/MM/yyyy");
  };
  const reset = () => {
    datetime.current?.reset();
    props.reset();
    myContext.afficherCalendar(false);
  };
  const cancel = () => {
    datetime.current?.cancel();
    myContext.afficherCalendar(false);
    modal.current?.dismiss();
  };
  const confirm = () => {
    datetime.current?.confirm();
    const dateStr = "25/05/1978";
    props.confirm(getSelectedDate());
    myContext.afficherCalendar(false);
  };
  return (
    <IonModal
      id="appelCalendar"
      ref={modal}
      isOpen={myContext.showCalendar}
      backdropDismiss={false}
    >
      <IonDatetime
        multiple={false}
        value={
          /\d{2}\/\d{2}\/\d{4}/g.exec(props.value) &&
          format(parse(props.value, "dd/MM/yyyy", new Date()), "yyyy-MM-dd")
        }
        ref={datetime}
        locale="fr-FR"
        presentation="date"
      >
        <IonButtons id="btn" slot="buttons">
          <IonButton color="danger" onClick={reset}>
            Vider
          </IonButton>
          <IonButton color="primary" onClick={cancel}>
            Annuler
          </IonButton>
          <IonButton color="primary" onClick={confirm}>
            Confirmer
          </IonButton>
        </IonButtons>
      </IonDatetime>
    </IonModal>
  );
};
export default ZoomCalendar;
