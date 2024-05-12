import React, { useState } from 'react';
import { IonButton, IonContent, IonPage, IonTitle, IonInput, IonIcon, IonRouterLink, IonAvatar, IonRow, IonCol } from '@ionic/react';
import { personOutline, lockClosedOutline } from 'ionicons/icons';
import { useHistory } from "react-router";
import { loginUser } from "../Firebase/firebase";
import { toast } from "../toast";
import './LoginPage.css';
import logo from "./../gambar/b3.png";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function login() {
    const result: any = await loginUser(email, password);
    if (result) {
    history.replace('/home');
    toast('you ve login now')
    }
    }
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
            <p>Login with</p>
          </IonCol>
        </IonRow>
        <IonCol>
          <div className="input-container">
            <IonIcon icon={personOutline} />
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
        <IonButton style={{ '--background': 'purple' }} expand="block" onClick={login}>
          Login
        </IonButton>
        <div className="register-container ion-text-center">
          <p>Don't have an account yet? <IonRouterLink href="/register">Register</IonRouterLink></p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
