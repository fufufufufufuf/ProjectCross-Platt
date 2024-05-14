import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToggle, IonAvatar, IonItem, IonLabel, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { moonOutline, sunnyOutline, logOutOutline, helpCircleOutline, cloudDownloadOutline, cameraOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import "./Profile.css";

const Profile: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
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

    const toggleDarkMode = () => {
        const body = document.body;
        setDarkMode(!darkMode);
        if (!darkMode) {
          body.classList.add('dark');
        } else {
          body.classList.remove('dark');
        }
    };

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
                <IonToolbar color="secondary">
                    <IonTitle color="primary">Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className={darkMode ? 'dark-theme' : undefined}>
                <IonCard color="secondary">
                    <IonCardContent>
                    <IonItem color="secondary">
                        <IonAvatar slot="start" style={{ width: '90px', height: '90px' }}>
                            {avatar ? <img src={avatar} alt="Avatar" /> : <IonIcon color="primary" icon={cameraOutline} style={{ fontSize: '48px', margin: '20px' }} />}
                        </IonAvatar>
                        <IonLabel color="primary" style={{ fontSize: '24px' }}>{username}</IonLabel>
                    </IonItem>
                    </IonCardContent>
                </IonCard>
                <IonCard color="secondary">
                    <IonCardContent color="primary">
                        <IonItem color="secondary">
                            <IonIcon color="primary" icon={moonOutline} slot="start" />
                            <IonLabel color="primary">Dark Mode</IonLabel>
                            <IonToggle slot="end" checked={darkMode} onIonChange={toggleDarkMode} />
                            <IonIcon color="primary" icon={sunnyOutline} slot="end" />
                        </IonItem>
                    </IonCardContent>
                    <IonCardContent color="primary">
                        <IonItem color="secondary" button onClick={logout}>
                            <IonIcon color="primary" icon={logOutOutline} slot="start" />
                            <IonLabel color="primary">Logout</IonLabel>
                        </IonItem>
                    </IonCardContent>
                    <IonCardContent>
                        <IonItem color="secondary" button onClick={help}>
                            <IonIcon color="primary" icon={helpCircleOutline} slot="start" />
                            <IonLabel color="primary">Help</IonLabel>
                        </IonItem>
                    </IonCardContent>
                    <IonCardContent>
                        <IonItem color="secondary" button onClick={checkUpdate}>
                            <IonIcon color="primary" icon={cloudDownloadOutline} slot="start" />
                            <IonLabel color="primary">Check for Update</IonLabel>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="upload-avatar" />
                <IonButton color="tertiary" expand="block" onClick={() => document.getElementById('upload-avatar')?.click()}><IonLabel color="light">Change Avatar</IonLabel></IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
