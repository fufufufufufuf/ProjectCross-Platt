import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToggle, IonAvatar, IonItem, IonLabel, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { moonOutline, sunnyOutline, logOutOutline, helpCircleOutline, cloudDownloadOutline, cameraOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const Profile: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [avatar, setAvatar] = useState<string | null>(null);
    const history = useHistory();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedAvatar = localStorage.getItem(`avatar_${storedUsername}`);
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            history.push('/login');
        }
        if (storedAvatar) {
            setAvatar(storedAvatar);
        }
    }, [history]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const logout = () => {
        history.push('/login');
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                setAvatar(dataUrl);
                localStorage.setItem(`avatar_${username}`, dataUrl); // Simpan avatar baru dengan kunci yang sama dengan username
            };
            reader.readAsDataURL(file);
        }
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
                        <IonAvatar slot="start" style={{ width: '90px', height: '90px' }}>
                            {avatar ? <img src={avatar} alt="Avatar" /> : <IonIcon icon={cameraOutline} style={{ fontSize: '48px', margin: '20px' }} />}
                        </IonAvatar>
                        <IonLabel style={{ fontSize: '24px' }}>{username}</IonLabel>
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
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="upload-avatar" />
                <IonButton expand="block" onClick={() => document.getElementById('upload-avatar')?.click()}>Change Avatar</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
