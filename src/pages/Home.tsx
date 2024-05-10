import React from 'react';
import { IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useLocation } from 'react-router-dom';
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonCol className="ion-text-center">Home</IonCol>
            <IonCol className="ion-text-end"> 
              <div>
                <span>{day.trim()}</span>
              </div>
              <div>
                <span>{date.trim()}</span>
              </div>
            </IonCol>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Display account balance */}
        <div className="balance">
          <span>Account Balance: {formatAmountToIDR(accountBalance)}</span>
        </div>
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
        <div>
          <span>Amount: {formatAmountToIDR(transactionDetails?.amount)}</span> {/* Display amount in Rupiah */}
        </div>
        <div>
          <span>Category: {transactionDetails?.category}</span>
          {renderCategoryIcon()}
        </div>
        <div>
          <span>Date: {transactionDetails?.date}</span>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;