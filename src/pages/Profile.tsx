import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonAvatar, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonToggle } from '@ionic/react';
import { moonOutline, sunnyOutline, logOutOutline, helpCircleOutline, cloudDownloadOutline, cameraOutline } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router';

const Profile: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [avatar, setAvatar] = useState<string | null>(null); // State untuk menyimpan URL gambar avatar
    const toggleDarkMode = () => setDarkMode(!darkMode);
    const history = useHistory();

    useEffect(() => {
        // Get username and avatar from local storage
        const storedUsername = localStorage.getItem('username');
        const storedAvatar = localStorage.getItem('avatar');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            // If username not found in local storage, redirect to login
            history.push('/login');
        }
        if (storedAvatar) {
            setAvatar(storedAvatar);
        }
    }, [history]);

    // Logout function
    const logout = () => {
        // Remove username and avatar from local storage
        localStorage.removeItem('username');
        localStorage.removeItem('avatar');
        // Redirect to login page
        history.push('/login');
    };

    // Function to handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the first file from input
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string; // Convert image to data URL
                setAvatar(dataUrl); // Set avatar state to display the uploaded image
                // Save the image URL to local storage or perform other operations as needed
                localStorage.setItem('avatar', dataUrl);
            };
            reader.readAsDataURL(file); // Read file as data URL
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
                {/* Input for uploading new image */}
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="upload-avatar" />
                <IonButton expand="block" onClick={() => document.getElementById('upload-avatar')?.click()}>Change Avatar</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
