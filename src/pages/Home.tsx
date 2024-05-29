import React, { useEffect, useState } from 'react';
import { IonCol, IonContent, IonHeader, IonPage, IonToolbar, IonRow, IonAvatar, IonIcon, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonSegment, IonSegmentButton } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { cameraOutline, arrowUpOutline, arrowDownOutline } from 'ionicons/icons'; // Import icons
import './Home.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Define TransactionDetails interface
interface TransactionDetails {
  amount?: number;
  category: string;
  type: string;
  date: string;
  balance: number;
}

const Home: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>('today');
  const [username, setUsername] = useState<string>('');
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const currentDate = getCurrentDate();
  const [day, date] = currentDate.split(',');

  // Access transaction details and account balance from location state
  const location = useLocation();
  const { transactionDetails, accountBalance }: { transactionDetails?: TransactionDetails, accountBalance?: number } = location.state || {};

  // Function to format amount as Rupiah (IDR)
  const formatAmountToIDR = (amount?: number): string => {
    if (amount === undefined) return '';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  // State to keep track of total income and total expenses
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

  useEffect(() => {
    if (transactionDetails) {
      if (transactionDetails.type === 'income') {
        setTotalIncome(prevIncome => prevIncome + (transactionDetails.amount || 0));
      } else if (transactionDetails.type === 'expenses') {
        setTotalExpenses(prevExpenses => prevExpenses + (transactionDetails.amount || 0));
      }
    }
  }, [transactionDetails]);


  // Render icons based on category type
  const renderCategoryIcon = (type: string) => {
    if (type === 'income') {
      return <IonIcon icon={arrowUpOutline} className="icon-green" />; // Green arrow pointing up for income
    } else if (type === 'expenses') {
      return <IonIcon icon={arrowDownOutline} className="icon-red" />; // Red arrow pointing down for expenses
    }
    return null;
  };


  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || '');
      } else {
        setUsername('');
      }
    });
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonRow className="header-content">
            <IonCol className="ion-text-start" size="6">
             
              <IonLabel color="primary" className="username">{username}</IonLabel>
            </IonCol>
            <IonCol className="ion-text-end" size="6">
              <IonLabel color="primary" className="current-date">{day.trim()}, {date.trim()}</IonLabel>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="account-balance">
            <IonCol size="12">
              <IonLabel color="primary" className="balance-label">Account Balance: {formatAmountToIDR(accountBalance)}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className="summary-cards">
            <IonCol size="6">
              <IonCard className="income-card">
                <IonCardHeader>
                  <IonCardTitle color="primary">Income</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonLabel>{formatAmountToIDR(totalIncome)}</IonLabel>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="expenses-card">
                <IonCardHeader>
                  <IonCardTitle color="primary">Expenses</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonLabel>{formatAmountToIDR(totalExpenses)}</IonLabel>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow className="segment-row">
            <IonCol size="12">
            <IonSegment color="primary" scrollable={true} value={selectedSegment} onIonChange={e => e.detail.value && setSelectedSegment(e.detail.value.toString())}>
                <IonSegmentButton value="today">
                  <IonLabel>Today</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="week">
                  <IonLabel>Week</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="month">
                  <IonLabel>Month</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="year">
                  <IonLabel>Year</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
          </IonRow>
          <IonRow className="transaction-details">
            <IonCol size="12">
              <IonLabel color="primary">Amount: {formatAmountToIDR(transactionDetails?.amount)}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className="transaction-details">
            <IonCol size="12" className="ion-align-items-center">
              <IonLabel color="primary">Category: {transactionDetails?.category}</IonLabel>
              {transactionDetails?.type && renderCategoryIcon(transactionDetails.type)}
            </IonCol>
          </IonRow>
          <IonRow className="transaction-details">
            <IonCol size="12">
              <IonLabel color="primary">Date: {transactionDetails?.date}</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
