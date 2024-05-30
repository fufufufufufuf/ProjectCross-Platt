import React, { useState } from 'react';
import { IonButton, IonContent, IonPage, IonTitle, IonInput, IonItem, IonGrid, IonRow, IonCol, IonCard, IonText, IonRouterLink, IonLabel, IonAvatar } from '@ionic/react';
import { useHistory } from "react-router";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "../toast";
import app from "../Firebase/firebase"; 
import './RegisterPage.css';
import logo from "../gambar/logo.png"

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  const auth = getAuth(app); 
  const registerHandler = () => {
    if (password !== confirmPassword) {
      toast("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: username
        }).then(() => {
          toast("Register Berhasil");
          console.log(userCredential);
          history.push('/login'); 
        }).catch((error) => {
          console.error(`Error updating profile: ${error.message}`);
          toast("Registration succeeded but failed to set username, please update it in your profile");
        });
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
          <IonAvatar className="ion-margin-top ion-text-center" style={{ width: '100px', height: '100px', margin: '0 auto' }}>
            <img src={logo} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </IonAvatar>
          <IonTitle color="primary" className="ion-title ion-text-center ion-padding">
            <IonText color="tertiary" className="budget-buddy-text">BudgetBuddy</IonText>
          </IonTitle>
          <IonGrid className="mg-grid">
            <IonRow className="ion-justify-content-between">
              <IonCol size="0" />
              <IonCol size="12" className="mg-col">
                <IonItem>
                  <IonInput
                    type="text"
                    placeholder="Username"
                    onIonChange={(e: any) => setUsername(e.target.value)}
                  />
                </IonItem>
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
