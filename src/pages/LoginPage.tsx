import React, { useState } from 'react';
import { IonButton, IonContent, IonPage, IonTitle, IonInput, IonIcon, IonRouterLink, IonAvatar, IonRow, IonCol } from '@ionic/react';
import { personOutline, lockClosedOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';
import logo from "./../gambar/b3.png";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    // Assuming successful login
    // Set username in local storage
    localStorage.setItem('username', username);
    // Redirect to HomeTabs page
    history.push('/tabs');
  };

  const handleRegisterRedirect = () => {
    history.push('/register');
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
                <p>Login with</p>
                <IonButton>
                <IonIcon slot="start" src="./../gambar/g.png" />
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
        <IonButton style={{ '--background': 'purple' }} expand="block" onClick={handleLogin}>
            Login
        </IonButton>
        <div className="register-container ion-text-center">
          <p>Don't have an account yet? <IonRouterLink onClick={handleRegisterRedirect}>Register</IonRouterLink></p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
