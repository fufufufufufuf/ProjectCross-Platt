import React, { useState } from 'react';
import { IonButton, IonContent, IonPage, IonTitle, IonInput, IonIcon, IonRouterLink, IonAvatar, IonRow, IonCol, IonText, IonGrid, IonCard, IonItem } from '@ionic/react';
import { personOutline, lockClosedOutline, mailOutline } from 'ionicons/icons';
import { toast } from "../toast";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router";
import './RegisterPage.css';


const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const register = async () => {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      toast("Registration successful!");
      // Redirect to login page or any other page upon successful registration
      history.push("/login");
    } catch (error) {
      console.error(error);
      toast("Registration failed. Please try again.");
    }
  };

  return (

    <IonPage>
    <IonContent  className="ion-justify-content-center" color="light" fullscreen>
    <IonCard className="ion-padding mg-card container-card">
    <IonTitle className="ion-title ion-text-center ion-padding ion-margin">
    Register
    </IonTitle>
    <IonGrid className=" mg-grid">
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
    <IonItem>
    <IonInput
    type="password"
    placeholder="Confirm Password"
    onIonChange={(e: any) => setPassword(e.target.value)}
    />
    </IonItem>
    </IonCol>
    <IonCol size="0" />
    </IonRow>
    <IonRow className="ion-justify-content-between ion-margin">
    <IonCol>
    <IonButton expand="block">
    Register
    </IonButton>
    </IonCol>
    </IonRow>
    <IonRow className="ion-justify-content-between ion-text-center ion-margin">
    <IonCol>
    <IonText className="ion-margin-top">Have an accout ? <IonRouterLink href="/login">Log In</IonRouterLink></IonText>
    </IonCol>
    </IonRow>
    </IonGrid>
    </IonCard>
    </IonContent>
    </IonPage>
    )
};

export default RegisterPage;
