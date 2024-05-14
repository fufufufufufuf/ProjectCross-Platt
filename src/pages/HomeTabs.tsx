import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonButton } from "@ionic/react";
import { Redirect, Route } from "react-router";
import { home, person, pricetags, time, add as addIcon } from "ionicons/icons";
import Profile from "./Profile";
import Category from './Category';
import Reports from './Reports';
import Home from "./Home";
import Add from "./Add";

const MemoryTabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/home"/>
                <Route path="/tabs/Home" component={Home} exact={true}/>
                <Route path="/tabs/category" component={Category} exact={true}/>
                <Route path="/tabs/reports" component={Reports} exact={true}/>
                <Route path="/tabs/profile" component={Profile} exact={true}/>
                <Route path="/tabs/add" component={Add} exact={true}/>
            </IonRouterOutlet>
            <IonTabBar color="tertiary" slot="bottom">
                <IonTabButton tab="home" href="/tabs/home">
                    <IonIcon icon={home} />
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="category" href="/tabs/category">
                    <IonIcon icon={pricetags} />
                    <IonLabel>Category</IonLabel>
                </IonTabButton>
                <IonTabButton tab="add" href="/tabs/add">
                    <IonIcon icon={addIcon} />
                </IonTabButton>
                <IonTabButton tab="reports" href="/tabs/reports">
                    <IonIcon icon={time} />
                    <IonLabel>Reports</IonLabel>
                </IonTabButton>
                <IonTabButton tab="profile" href="/tabs/profile">
                    <IonIcon icon={person} />
                    <IonLabel>Profile</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
}
export default MemoryTabs;
