import React, { useState } from 'react';
import { IonButton, IonContent, IonPage, IonTitle, IonInput, IonIcon, IonRouterLink, IonAvatar, IonRow, IonCol } from '@ionic/react';
import { personOutline, lockClosedOutline, mailOutline } from 'ionicons/icons';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from 'react-router-dom';
import './RegisterPage.css';
import logo from './../gambar/b3.png';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleRegister = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Pendaftaran berhasil, navigasi ke halaman login
        history.push('/login');
      })
      .catch((error: Error) => {
        // Tangani kesalahan pendaftaran
        console.error('Registration error:', error.message);
        alert('Failed to register: ' + error.message);
      });
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div className="avatar-container ion-text-center">
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
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="ion-text-center">
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
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="ion-text-center">
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
        </IonRow>
        <IonRow>
          <IonCol className="ion-text-center">
            <IonButton style={{ '--background': 'purple' }} expand="block" onClick={handleRegister}>
              Register
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="ion-text-center">
            <div className="login-container">
              <p>Already have an account? <IonRouterLink href="/login">Login</IonRouterLink></p>
            </div>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
