import { Checkbox } from "@mui/material";
import "./css/specheckbox.scss";
interface checkF {
  id: string;
  checked: boolean;
  titre: string;
  onChange: any;
}
const SpeCheckBox = (props: checkF) => {
  return (
    <div id="speCheckBox">
      <Checkbox
        checked={props.checked}
        onChange={(e) => {
          props.onChange(props.id, e.target.checked);
        }}
      />
      <span className="speTitre">{props.titre}</span>
    </div>
  );
};
export default SpeCheckBox;
