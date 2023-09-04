import { IonApp,  setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, useHistory } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Auth from "./pages/Auth";
import Auth_Connection from "./pages/Auth_Connection";
import Auth_Pwd from "./pages/Auth_Pwd";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import Menu from "./pages/Menu";
import Profil from "./pages/Profil";
import BoiteReception from "./pages/Messagerie/BoiteReception/BoiteReception";
import Report from "./pages/Report";
import MaFiche from "./pages/mafiche/MaFiche";

setupIonicReact();


const App: React.FC = () => {
  const islogged = useSelector((state: RootState) => state.User.isLogged);
  const history = useHistory();

  useEffect(() => {
    if (!islogged) history.push("/");
  }, [islogged]);
  

  return (
   
    <IonApp>
      <IonReactRouter>
        <Route path="/" exact={true}>
        <Auth/>
        </Route>
        <Route
          path="/connexion_manager/:conn/"
          exact={true}
          component={Auth_Connection}
        />
        <Route
          path="/connexion_manager/"
          exact={true}
          component={Auth_Connection}
        />
        <Route
          path="/MaFiche"
          exact={true}
          component={MaFiche}
        />
        <Route
          path="/messagerie"
          exact={true}
          component={BoiteReception}
        />
        <Route
          path="/repport/:name"
          exact={true}
          component={Report}
        />
        
        <Route path="/mot_de_passe_oublie/" exact={true} component={Auth_Pwd} />
        <Route path="/page/:type/:name/:id/" exact={true} component={Menu} />
        <Route path="/page/:type/:name/" exact={true} component={Menu} />
        <Route path="/page/:type/:name/" exact={true} component={Menu} />

        <Route
          path="/page/"
          strict={true}
          exact={true}
          render={() => <Redirect to="/page/accueil" />}
        />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
