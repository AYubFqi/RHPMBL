import { useParams } from "react-router";
import Report from "./Report";
interface paramsF {
  type: string;
  name: string;
  id: string;
}
const ShowEcran = () => {
  const { type, name, id } = useParams<paramsF>();
  const getComponent = () => {
    switch (true) {
      case type === "rpt":
        return <Report  />;
      default:
        break;
    }
  };
  return <div>{getComponent()}</div>;
};

export default ShowEcran;
