import React, { useState } from 'react';
import { IonButton, IonContent, IonPage, IonTitle, IonInput, IonItem, IonGrid, IonRow, IonCol, IonCard, IonText, IonRouterLink, IonLabel } from '@ionic/react';
import { useHistory } from "react-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "../toast";
import app from "../Firebase/firebase"; // Import the initialized app
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  const auth = getAuth(app); // Use the initialized app
  const registerHandler = () => {
    if (password !== confirmPassword) {
      toast("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast("Register Berhasil");
        console.log(userCredential);
        history.push('/login'); // Redirect to the home page or another page after successful registration
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error (${errorCode}): ${errorMessage}`);
        toast("Registration failed, please try again");
      });
  };

  return (
    <IonPage>
      <IonContent className="ion-justify-content-center" color="light" fullscreen>
        <IonCard className="ion-padding mg-card container-card">
          <IonTitle color="primary" className="ion-title ion-text-center ion-padding ion-margin">
            Register
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
                <IonItem>
                  <IonInput
                    type="password"
                    placeholder="Confirm Password"
                    onIonChange={(e: any) => setConfirmPassword(e.target.value)}
                  />
                </IonItem>
              </IonCol>
              <IonCol size="0" />
            </IonRow>
            <IonRow className="ion-justify-content-between ion-margin">
              <IonCol>
                <IonButton color="tertiary" expand="block" onClick={registerHandler}>
                  <IonLabel color="light">Register</IonLabel>
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-between ion-text-center ion-margin">
              <IonCol>
                <IonText color="primary" className="ion-margin-top">
                  Have an account? <IonRouterLink color="medium" href="/login">Log In</IonRouterLink>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
