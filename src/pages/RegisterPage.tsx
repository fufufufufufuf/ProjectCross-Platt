import React, { useState } from 'react';
import { IonButton, IonContent, IonPage, IonTitle, IonInput, IonIcon, IonRouterLink, IonAvatar, IonRow, IonCol } from '@ionic/react';
import { personOutline, lockClosedOutline, mailOutline } from 'ionicons/icons'; // Import ikon
import { useHistory } from 'react-router-dom'; // Import useHistory hook untuk navigasi
import './RegisterPage.css'; // File CSS untuk styling
import logo from "./../gambar/b3.png";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); // Inisialisasi useHistory hook

  const handleRegister = () => {
    // Simpan informasi akun dalam localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // Redirect ke halaman login setelah pendaftaran berhasil
    history.push('/login');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div className="avatar-container">
          <IonAvatar style={{ width: '150px', height: '150px' }}>
            <img src={logo} alt="Avatar" />
          </IonAvatar>
        </div>
        <IonRow className="ion-text-center">
            <IonCol>
                <div className="logo-container">
                <IonTitle className="ion-text-center app-title">Budget Buddy</IonTitle>
                </div>
                <p>Sign Up with</p>
                <IonButton>
                    Google
                </IonButton>
                <IonButton>
                    Facebook
                </IonButton>
            </IonCol>
        </IonRow>
        <IonCol>
        <div className="input-container">
          <IonIcon icon={personOutline} />
          <IonInput
            type="text"
            placeholder="Username"
            value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}
            className="input-field"
          />
        </div>
        <div className="input-container">
          <IonIcon icon={mailOutline} />
          <IonInput
            type="email"
            placeholder="Email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            className="input-field"
          />
        </div>
        <div className="input-container">
          <IonIcon icon={lockClosedOutline} />
          <IonInput
            type="password"
            placeholder="Password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            className="input-field"
          />
        </div>
        </IonCol>
        <IonButton style={{ '--background': 'purple' }} expand="block" onClick={handleRegister}>
            Register
        </IonButton>
        <div className="login-container ion-text-center">
          <p>Already have an account? <IonRouterLink href="/login">Login</IonRouterLink></p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
