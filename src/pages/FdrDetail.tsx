import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { getTypEcran } from "../config/config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useParams, useHistory } from "react-router";
import "../css/fdrdetail.scss";
interface paramF {
  name: string;
}
const FdrDetail = () => {
  const history = useHistory();
  const { name } = useParams<paramF>();
  const [modeList, setModeList] = useState(true);
 
  // useEffect(() => {
  //   setModeList(
  //     localStorage.getItem("modeList")
  //       ? localStorage.getItem("modeList") === "true"
  //       : false
  //   );
  // }, []);
  useEffect(() => {
    localStorage.setItem("modeList", modeList.toString());
  }, [modeList]);
  return (
    <>
      
    </>
  );
};

export default FdrDetail;
