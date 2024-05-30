import React, { useEffect, useState } from 'react';
import { IonCol, IonContent, IonHeader, IonPage, IonToolbar, IonRow, IonIcon, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonSegment, IonSegmentButton } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { arrowUpOutline, arrowDownOutline } from 'ionicons/icons'; 
import './Home.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface TransactionDetails {
  amount?: number;
  category: string;
  type: string;
  date: string;
  balance: number;
}

interface LocationState {
  transactionDetails?: TransactionDetails;
  accountBalance?: number;
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
  const location = useLocation<LocationState>();
  const { transactionDetails, accountBalance: locationAccountBalance } = location.state || {};
  const [transactionDetailsState, setTransactionDetailsState] = useState<TransactionDetails | null>(transactionDetails || null);
  const [accountBalance, setAccountBalance] = useState<number>(locationAccountBalance || 0);

  const formatAmountToIDR = (amount?: number): string => {
    if (amount === undefined) return '';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

  useEffect(() => {
    if (transactionDetailsState) {
      if (transactionDetailsState.type === 'income') {
        setTotalIncome(prevIncome => prevIncome + (transactionDetailsState.amount || 0));
      } else if (transactionDetailsState.type === 'expenses') {
        setTotalExpenses(prevExpenses => prevExpenses + (transactionDetailsState.amount || 0));
      }
    }
  }, [transactionDetailsState]);

  useEffect(() => {
    // Retrieve transaction details from localStorage if not available in state
    if (!transactionDetailsState) {
      const storedTransactionDetails = JSON.parse(localStorage.getItem('transactionDetails') || 'null');
      if (storedTransactionDetails) {
        setTransactionDetailsState(storedTransactionDetails);
        if (storedTransactionDetails.type === 'income') {
          setTotalIncome(storedTransactionDetails.amount || 0);
        } else if (storedTransactionDetails.type === 'expenses') {
          setTotalExpenses(storedTransactionDetails.amount || 0);
        }
      }
    }

    // Retrieve account balance from localStorage if not available in state
    if (!accountBalance) {
      const storedAccountBalance = parseFloat(localStorage.getItem('accountBalance') || '0');
      setAccountBalance(storedAccountBalance);
    }

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || '');
      } else {
        setUsername('');
      }
    });
  }, [transactionDetailsState, accountBalance]);

  const renderCategoryIcon = (type: string) => {
    if (type === 'income') {
      return <IonIcon icon={arrowUpOutline} className="icon-green" />; 
    } else if (type === 'expenses') {
      return <IonIcon icon={arrowDownOutline} className="icon-red" />; 
    }
    return null;
  };

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
          {transactionDetailsState && (
            <>
              <IonRow className="transaction-details">
                <IonCol size="12">
                  <IonLabel color="primary">Amount: {formatAmountToIDR(transactionDetailsState.amount)}</IonLabel>
                </IonCol>
              </IonRow>
              <IonRow className="transaction-details">
                <IonCol size="12" className="ion-align-items-center">
                  <IonLabel color="primary">Category: {transactionDetailsState.category}</IonLabel>
                  {transactionDetailsState.type && renderCategoryIcon(transactionDetailsState.type)}
                </IonCol>
              </IonRow>
              <IonRow className="transaction-details">
                <IonCol size="12">
                  <IonLabel color="primary">Date: {transactionDetailsState.date}</IonLabel>
                </IonCol>
              </IonRow>
            </>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
