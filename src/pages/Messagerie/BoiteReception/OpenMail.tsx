import { useContext, useEffect } from "react";
import { createAnimation, IonModal } from "@ionic/react";

import { myCntxt } from "./BoiteReception";

function OpenMail({ isOpen, id_msg }: { isOpen: boolean; id_msg: number }) {
  const { setIsOpen, toDo, setToDo } = useContext(myCntxt);
  const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

   

    
    return createAnimation()
      .addElement(baseEl)
      .easing("ease-out")
      .duration(500)
  };

  const leaveAnimation = (baseEl: HTMLElement) => {
    return enterAnimation(baseEl).direction("reverse");
  };
  useEffect(() => {
    if (!isOpen) {
      setToDo("lire");
    }
  }, [isOpen]);
  return (
    <IonModal
      isOpen={isOpen}
      id="MailModal"
      enterAnimation={enterAnimation}
      leaveAnimation={leaveAnimation}
      onDidDismiss={() => setIsOpen(false)}
    >
      
    </IonModal>
  );
}

export default OpenMail;
