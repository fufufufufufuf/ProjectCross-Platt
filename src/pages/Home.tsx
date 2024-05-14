import React, { useEffect, useState } from 'react';
import { IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonRow, IonAvatar, IonIcon, IonLabel } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { cameraOutline } from 'ionicons/icons'; // Import icon camera
import './Home.css';

// Define TransactionDetails interface
interface TransactionDetails {
  amount: number | undefined;
  category: string;
  type: string;
  date: string;
  balance: number; // Include balance in transaction details
}

const Home: React.FC = () => {
  // Function to format the current date as "Day, Month Date"
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const currentDate = getCurrentDate();
  const [day, date] = currentDate.split(',');

  // Access transaction details and account balance from location state
  const location = useLocation();
  const { transactionDetails, accountBalance }: { transactionDetails: TransactionDetails, accountBalance: number } = (location.state as any) || {};

  // Function to format amount as Rupiah (IDR)
  const formatAmountToIDR = (amount: number | undefined): string => {
    if (!amount) return '';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  // Render icons based on category type
  const renderCategoryIcon = () => {
    if (transactionDetails?.type === 'income') {
      return <span className="icon-green">&#8593;</span>; // Green arrow pointing up for income
    } else if (transactionDetails?.type === 'expenses') {
      return <span className="icon-red">&#8595;</span>; // Red arrow pointing down for expenses
    }
    return null;
  };

  // Get username and avatar from local storage
  const [username, setUsername] = useState<string>('');
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedAvatar = localStorage.getItem('avatar');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonRow>
            <IonCol className="ion-text-start">
              {avatar ? (
                <IonAvatar slot="start">
                  <img src={avatar} alt="Avatar" />
                </IonAvatar>
              ) : (
                <IonAvatar slot="start">
                  <IonIcon icon={cameraOutline} />
                </IonAvatar>
              )}
              <IonLabel color="primary">{username}</IonLabel>
            </IonCol>
            <IonCol className="ion-text-end">
              <div>
                <IonLabel color="primary">{day.trim()}</IonLabel>
              </div>
              <div>
              <IonLabel color="primary">{date.trim()}</IonLabel>
              </div>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCol className='ion-padding'>
          <IonLabel color="primary">Account Balance: {formatAmountToIDR(accountBalance)}</IonLabel>
        </IonCol>
        {/* Buttons for selecting income and expense types */}
        <IonToolbar>
          <IonButton
            className="type-button"
            color={transactionDetails?.type === 'income' ? 'success' : 'medium'}
            onClick={() => console.log('Income selected')}
          >
            Income
          </IonButton>
          <IonButton
            className="type-button"
            color={transactionDetails?.type === 'expenses' ? 'danger' : 'medium'}
            onClick={() => console.log('Expenses selected')}
          >
            Expenses
          </IonButton>
        </IonToolbar>
        <IonRow className='ion-padding'>
          <IonLabel color="primary">Amount: {formatAmountToIDR(transactionDetails?.amount)}</IonLabel> {/* Display amount in Rupiah */}
        </IonRow>
        <IonRow className='ion-padding'>
          <IonLabel color="primary">Category: {transactionDetails?.category}</IonLabel>
          {renderCategoryIcon()}
        </IonRow>
        <IonRow className='ion-padding'>
          <IonLabel color="primary">Date: {transactionDetails?.date}</IonLabel>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;
