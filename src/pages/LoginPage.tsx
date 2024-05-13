import React, { useState } from 'react';
import { IonButton, IonContent, IonPage, IonTitle, IonInput, IonIcon, IonRouterLink, IonAvatar, IonRow, IonCol, IonCard, IonGrid, IonItem, IonText } from '@ionic/react';
import { personOutline, lockClosedOutline } from 'ionicons/icons';
import { useHistory } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "../toast";
import './LoginPage.css';
import logo from "./../gambar/b3.png";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const login = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to dashboard or any other page upon successful login
      history.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast("Login failed, please check your email and password");
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-justify-content-center" color="light" fullscreen>
        <IonCard className="ion-padding mg-card container-card">
          <IonTitle className="ion-title ion-text-center ion-padding ion-margin">
            Login
          </IonTitle>
          <IonGrid className="mg-grid">
            <IonRow className="ion-justify-content-between">
              <IonCol size="0" />
              <IonCol size="12" className="mg-col">
                <IonItem>
                  <IonInput
                    type="email"
                    placeholder="Email"
                    onIonChange={(e: any) => setEmail(e.target.value)}
                  />
                </IonItem>
                <IonItem>
                  <IonInput
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
                <IonButton expand="block" onClick={login}>
                  Login
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-between ion-text-center ion-margin">
              <IonCol>
                <IonText className="ion-margin-top">Dont have an account? <IonRouterLink href="/register">Sign Up</IonRouterLink></IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
