import React, { useState } from 'react';
import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonToggle } from '@ionic/react';
import { moonOutline, sunnyOutline, personOutline, logOutOutline, helpCircleOutline, cloudDownloadOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const Profile: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const toggleDarkMode = () => setDarkMode(!darkMode);
    
    const logout = () => {
        // Logic for logout
    };
    
    const help = () => {
        // Logic for help
    };

    const checkUpdate = () => {
        // Logic for checking update
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className={darkMode ? 'dark-theme' : undefined}>
                <IonCard>
                    <IonCardContent>
                        <IonItem>
                            <IonImg src="path_to_your_image" slot="start" />
                            <IonLabel>Your Name</IonLabel>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardContent>
                        <IonItem>
                            <IonIcon icon={moonOutline} slot="start" />
                            <IonLabel>Dark Mode</IonLabel>
                            <IonToggle slot="end" checked={darkMode} onIonChange={toggleDarkMode} />
                            <IonIcon icon={sunnyOutline} slot="end" />
                        </IonItem>
                    </IonCardContent>
                    <IonCardContent>
                        <IonItem button onClick={logout}>
                            <IonIcon icon={logOutOutline} slot="start" />
                            <IonLabel>Logout</IonLabel>
                        </IonItem>
                    </IonCardContent>
                    <IonCardContent>
                    <IonItem button onClick={help}>
                            <IonIcon icon={helpCircleOutline} slot="start" />
                            <IonLabel>Help</IonLabel>
                        </IonItem>
                    </IonCardContent>
                    <IonCardContent>
                        <IonItem button onClick={checkUpdate}>
                            <IonIcon icon={cloudDownloadOutline} slot="start" />
                            <IonLabel>Check for Update</IonLabel>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
