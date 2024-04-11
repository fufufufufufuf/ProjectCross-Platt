import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { Redirect, Route } from "react-router";
import { homeOutline,  person,  pricetagsOutline,  timeOutline } from "ionicons/icons";
import Profile from "./Profile";
import Category from './Category';
import Reports from './Reports'
import Home from "./Home";


const MemoryTabs: React.FC = () => {
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/home"/>
                <Route path="/tabs/Home" component={Home}/>
                <Route path="/tabs/category" component={Category}/>
                <Route path="/tabs/reports" component={Reports}/>
                <Route path="/tabs/profile" component={Profile}/>
            </IonRouterOutlet>
            <IonTabBar color="tertiary" slot="bottom">
                <IonTabButton tab="home" href="/tabs/home">
                    <IonIcon icon={homeOutline}/>
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="category" href="/tabs/category">
                    <IonIcon icon={pricetagsOutline}/>
                    <IonLabel>Category</IonLabel>
                </IonTabButton>
                <IonTabButton tab="reports" href="/tabs/reports">
                    <IonIcon icon={timeOutline}/>
                    <IonLabel>Reports</IonLabel>
                </IonTabButton>
                <IonTabButton tab="profile" href="/tabs/profile">
                    <IonIcon icon={person}/>
                    <IonLabel>Profile</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
}
export default MemoryTabs;