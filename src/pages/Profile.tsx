import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToggle, IonAvatar, IonItem, IonLabel, IonCard, IonCardContent, IonIcon, IonActionSheet } from '@ionic/react';
import { moonOutline, sunnyOutline, logOutOutline, cameraOutline, imageOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable, StorageReference, getStorage, uploadBytes } from 'firebase/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import app from '../Firebase/firebase';
import "./Profile.css";


const Profile: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [username, setUsername] = useState<string>('');
    const [avatar, setAvatar] = useState<string | null>(null);
    const [showActionSheet, setShowActionSheet] = useState(false);
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

    const handleImageUpload = (dataUrl: string | null, file?: File) => {
        if (auth.currentUser && (dataUrl || file)) {
            const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`);
            
            if (dataUrl) {
                const byteArray = Uint8Array.from(atob(dataUrl.split(',')[1]), c => c.charCodeAt(0));
                const metadata = {
                    contentType: 'image/jpeg'
                };
                const uploadTask = uploadBytes(storageRef, byteArray, metadata);
    
                uploadTask.then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then((url) => {
                            setAvatar(url);
                        })
                        .catch((error) => {
                            console.error("Error fetching avatar:", error);
                        });
                }).catch((error) => {
                    console.error("Error uploading avatar:", error);
                });
            } else if (file) {
                const metadata = {
                    contentType: file.type
                };
                const uploadTask = uploadBytes(storageRef, file, metadata);
    
                uploadTask.then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then((url) => {
                            setAvatar(url);
                        })
                        .catch((error) => {
                            console.error("Error fetching avatar:", error);
                        });
                }).catch((error) => {
                    console.error("Error uploading avatar:", error);
                });
            }
        }
    };
    
    
    
    const handleCameraClick = async () => {
        try {
            const photo = await Camera.getPhoto({
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Camera,
                quality: 100
            });
            if (photo.dataUrl) {
                handleImageUpload(photo.dataUrl);
            } else {
                console.error("No photo data received.");
            }
        } catch (error) {
            console.error("Error taking photo:", error);
        }
    };
    
    const handleFileInputChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                handleImageUpload(dataUrl, file);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleGalleryClick = () => {
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = 'image/*';
        inputElement.addEventListener('change', handleFileInputChange);
        inputElement.click();
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
                </IonCard>
                <IonButton color="tertiary" expand="block" onClick={() => setShowActionSheet(true)}>
                    <IonLabel color="light">Change Avatar</IonLabel>
                </IonButton>
                <IonActionSheet
                    isOpen={showActionSheet}
                    onDidDismiss={() => setShowActionSheet(false)}
                    buttons={[
                        {
                            text: 'Take Photo',
                            icon: cameraOutline,
                            handler: handleCameraClick,
                        },
                        {
                            text: 'Choose from Gallery',
                            icon: imageOutline,
                            handler: handleGalleryClick,
                        },
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            icon: 'close',
                        },
                    ]}
                />
            </IonContent>
        </IonPage>
    );
};

export default Profile;
