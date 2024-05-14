import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToggle, IonAvatar, IonItem, IonLabel, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { moonOutline, sunnyOutline, logOutOutline, helpCircleOutline, cloudDownloadOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import app from '../Firebase/firebase';
import defaultAvatar from '../gambar/b3.png'; // Import default avatar image
import "./Profile.css";

const Profile: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [username, setUsername] = useState<string>('');
    const [avatar, setAvatar] = useState<string | null>(null);
    const history = useHistory();

    const auth = getAuth(app);
    const storage = getStorage(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsername(user.displayName || '');
                const avatarRef = ref(storage, `avatars/${user.uid}`);
                getDownloadURL(avatarRef)
                    .then((url) => {
                        setAvatar(url);
                    })
                    .catch((error) => {
                        console.error("Error fetching avatar:", error);
                    });
            } else {
                history.push('/login');
            }
        });

        return () => unsubscribe();
    }, [auth, history, storage]);

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
        signOut(auth)
            .then(() => {
                history.push('/login');
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                if (auth.currentUser) {
                    const avatarRef = ref(storage, `avatars/${auth.currentUser.uid}`);
                    uploadString(avatarRef, dataUrl, 'data_url')
                        .then(() => {
                            setAvatar(dataUrl);
                        })
                        .catch((error) => {
                            console.error("Error uploading avatar:", error);
                        });
                }
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
                                {avatar ? <img src={avatar} alt="Avatar" /> : <img src={defaultAvatar} alt="Default Avatar" />} {/* Use default avatar image if avatar is not set */}
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
