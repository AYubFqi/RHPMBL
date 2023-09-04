import React, { ChangeEvent, useState } from 'react'
import { Box, Tab, Tabs } from "@mui/material";
import {TabPanel,TabContext, TabList} from '@mui/lab';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import Fiche from './Fiche';

const MaFiche : React.FC = () => {
    const [tabValue, setTabValue] = useState<string>("1");
    const handleChange = (event: ChangeEvent<{}>, newValue: string) => {
        setTabValue(newValue);
      };
  return (
    <IonPage>
        <IonHeader>
          <IonToolbar color="rayfirst">
          <IonButtons slot="start">
            <IonBackButton
              icon={chevronBack}
              text="Retour"
              defaultHref="/page/accueil/dash/"
            ></IonBackButton>
          </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <TabContext value={tabValue}  >
    <Box sx={{ borderBottom: 1, borderColor: 'divider', alignItems: "center" }}>
      <TabList onChange={(e: ChangeEvent<{}>, newValue: string) => handleChange(e, newValue)} aria-label="lab API tabs example">
        <Tab style={{width:"25%",color:"#0a84a9"}}  label="Fiche" value="1" />
        <Tab style={{width:"25%",color:"#0a84a9"}} label="CV" value="2" />
        <Tab style={{width:"25%",color:"#0a84a9"}} label="Famille" value="3" />
        <Tab style={{width:"25%",color:"#0a84a9"}} label="Autres" value="4" />
      </TabList>
    </Box>
    <TabPanel style={{padding:"0px",height:"100%"}} value="1" ><Fiche /></TabPanel>
    <TabPanel style={{padding:"0px"}} value="2"><div /></TabPanel>
    <TabPanel style={{padding:"0px",height:"100%"}} value="3" ><div /></TabPanel>
    <TabPanel style={{padding:"0px"}} value="4"><div /></TabPanel>
    
  </TabContext></IonContent></IonPage>
    
  )
}

export default MaFiche