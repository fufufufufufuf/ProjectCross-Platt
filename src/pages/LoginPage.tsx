import React, { useState } from 'react';
import { IonButton, IonContent, IonPage, IonTitle, IonInput, IonItem, IonGrid, IonRow, IonCol, IonCard, IonText, IonRouterLink, IonLabel } from '@ionic/react';
import { useHistory } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "../toast";
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const auth = getAuth();
  const loginHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast("Login Berhasil");
        console.log(userCredential);
        history.push('/tabs'); // Redirect to the home page or another page after successful login
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error (${errorCode}): ${errorMessage}`);
        toast("Login failed, please check your password and email");
      });
  };

  return (
    <IonPage>
      <IonContent className="ion-justify-content-center" fullscreen>
        <IonCard className="ion-padding mg-card container-card">
          <IonTitle color="primary" className="ion-title ion-text-center ion-padding ion-margin">
          </IonTitle>
          <IonGrid  className="mg-grid">
            <IonRow  className="ion-justify-content-between">
              <IonCol size="0" />
              <IonCol color="primary" size="12" className="mg-col">
                <IonItem>
                  <IonInput color="primary"
                    type="email"
                    placeholder="Email"
                    onIonChange={(e: any) => setEmail(e.target.value)}
                  />
                </IonItem>
                <IonItem>
                  <IonInput color="primary"
                    type="password"
                    placeholder="Password"
                    onIonChange={(e: any) => setPassword(e.target.value)}
                  />
                </IonItem>
              </IonCol>
              <IonCol size="0" />
            </IonRow>
            <IonRow className="ion-justify-content-between ion-margin">
              <IonCol>
                <IonButton color="tertiary" expand="block" onClick={loginHandler}>
                  <IonLabel color="light">Login</IonLabel>
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-between ion-text-center ion-margin">
              <IonCol>
                <IonText color="primary" className="ion-margin-top">
                  Don't have an account? <IonRouterLink color="medium" href="/register">Sign Up</IonRouterLink>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
