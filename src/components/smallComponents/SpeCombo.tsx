import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { myAxios } from "../../config/config";
import "./css/specombo.scss";
interface propsF {
  id: any;
  className?: string;
  titre: string;
  value: any;
  rubrique?: string;
  numZoom?: string;
  ColonneAffichees?: number[];
  condition?: string;
  onChange: any;
  style?: any;
  disabled?: boolean;
}
const SpeCombo = ({
  rubrique,
  id,
  style,
  titre,
  value: propsValue,
  numZoom,
  condition,
  ColonneAffichees,
  onChange,
  disabled,
}: propsF) => {
  const [zoom, setZoom] = useState<any>([]);
  const [valeur, setValeur] = useState(propsValue);
  useEffect(() => {
    myAxios(rubrique ? "getrubriques" : "zoom", {
      rubrique: rubrique,
      numZoom: numZoom,
      condition: condition,
    })
      .then((data) => {
        rubrique ? setZoom(data.data) : setZoom(data.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const col1 =
    ColonneAffichees && ColonneAffichees?.length >= 2 ? ColonneAffichees[0] : 0;
  const col2 =
    ColonneAffichees && ColonneAffichees?.length >= 2 ? ColonneAffichees[1] : 1;
  useEffect(() => setValeur(propsValue), [zoom]);
  return (
    <div id="speCombo" style={{ ...style }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="myLabel">{titre}</InputLabel>
        <Select
          disabled={disabled}
          style={{ zIndex: "9999", color: "var(--Couleur)" }}
          labelId="myLabel"
          id="me"
          value={valeur}
          onChange={(e) => {
            onChange(id, e.target.value);
          }}
        >
          <MenuItem key={9999999}></MenuItem>
          {zoom.map((rw: any, i: number) => {
            return (
              <MenuItem key={i} value={rw[Object.keys(rw)[col1]]}>
                {rw[Object.keys(rw)[col2]]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SpeCombo;
