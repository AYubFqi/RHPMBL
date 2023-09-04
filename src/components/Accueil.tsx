import "./smallComponents/css/accueil.scss";
import {useHistory, useParams } from "react-router";
import { paramsF } from "./MenuRight";
import { Box, Tab, Tabs } from "@mui/material";
import {TabPanel,TabContext, TabList} from '@mui/lab';
import { ChangeEvent, useState } from "react";
import Recemment from "./Recemment";
import Parapheur from "./Parapheur";

const Accueil: React.FC = () => {
  const history = useHistory();
  const tab:paramsF = useParams()
  // const mnus = useSelector((state: RootState) => state.Menus.menus)
 

  const [tabValue, setTabValue] = useState<string>("2");
  
  const handleChange = (event: ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };
  return (
  
    <div id="accueil" style={{ paddingTop: "10px" ,color:"#EBF9F9"}}>
    <TabContext value={tabValue}  >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', alignItems: "center" }}>
        <TabList onChange={(e: ChangeEvent<{}>, newValue: string) => handleChange(e, newValue)} aria-label="lab API tabs example">
          <Tab style={{width:"50%",color:"#0a84a9"}}  label="favori" value="1" />
          <Tab style={{width:"50%",color:"#0a84a9"}} label="Parapheur" value="2" />
        </TabList>
      </Box>
      <TabPanel style={{padding:"0px",height:"100%"}} value="1" ><Recemment /></TabPanel>
      <TabPanel style={{padding:"0px"}} value="2"><Parapheur /></TabPanel>
    </TabContext>
    </div>
    
  );
};

export default Accueil;
