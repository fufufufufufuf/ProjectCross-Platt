import { IonIcon, IonLabel, IonRouterOutlet, IonTab, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { Redirect, Route } from "react-router";
import { happy,  homeOutline,  sad, statsChartOutline, timeOutline } from "ionicons/icons";
import Dashboard from './Dashboard';
import History from './History'
import Home from "./Home";


const MemoryTabs: React.FC = () => {
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/home"/>
                <Route path="/tabs/Home" component={Home}/>
                <Route path="/tabs/dashboard" component={Dashboard}/>
                <Route path="/tabs/history" component={History}/>
            </IonRouterOutlet>
            <IonTabBar color="tertiary" slot="bottom">
                <IonTabButton tab="home" href="/tabs/home">
                    <IonIcon icon={homeOutline}/>
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="dashboard" href="/tabs/dashboard">
                    <IonIcon icon={statsChartOutline}/>
                    <IonLabel>Dashboard</IonLabel>
                </IonTabButton>
                <IonTabButton tab="history" href="/tabs/history">
                    <IonIcon icon={timeOutline}/>
                    <IonLabel>History</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
}
export default MemoryTabs;