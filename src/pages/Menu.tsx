import { IonNav } from "@ionic/react";
import MenuLeft from "../components/MenuLeft";
import MenuRight from "../components/MenuRight";


const Menu: React.FC  = () => {


  return (
    <IonNav root={() => 
    <>
      <MenuLeft />
      <MenuRight />
    </>
   }></IonNav>
    
  );
};
export default Menu;
