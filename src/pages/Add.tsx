// Add.tsx
import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonGrid, IonRow, IonCol, IonDatetime } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Add: React.FC = () => {
    const [amount, setAmount] = useState<number | undefined>();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [transactionDate, setTransactionDate] = useState<string>(new Date().toISOString());
    const [accountBalance, setAccountBalance] = useState<number>(0); // Track account balance
    const history = useHistory();

    const handleSaveTransaction = () => {
        // Calculate new account balance based on transaction type
        const newBalance = selectedType === 'income' ? accountBalance + (amount || 0) : accountBalance - (amount || 0);

        // Update account balance
        setAccountBalance(newBalance);

        // Proses menyimpan transaksi dengan jumlah, kategori, jenis, dan tanggal yang dipilih
        const transactionDetails = {
            amount: amount,
            category: selectedCategory,
            type: selectedType,
            date: transactionDate,
            balance: newBalance // Include balance in transaction details
        };

        // Navigate to Home page with transaction details and updated balance
        history.push({
            pathname: '/tabs/home',
            state: { transactionDetails: transactionDetails, accountBalance: newBalance }
        });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add Transaction</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel position="floating">Amount</IonLabel>
                    <IonInput type="number" value={amount} placeholder="Rp" onIonChange={e => setAmount(parseFloat(e.detail.value!))}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Category</IonLabel>
                    <IonSelect value={selectedCategory} placeholder="Select Category" onIonChange={e => setSelectedCategory(e.detail.value)}>
                        <IonSelectOption value="Gaji">Gaji</IonSelectOption>
                        <IonSelectOption value="Investasi">Investasi</IonSelectOption>
                        <IonSelectOption value="Usaha">Usaha</IonSelectOption>
                        <IonSelectOption value="Makanan & Minuman">Makanan & Minuman</IonSelectOption>
                        <IonSelectOption value="Pendidikan">Pendidikan</IonSelectOption>
                        <IonSelectOption value="Pajak">Pajak</IonSelectOption>
                        <IonSelectOption value="Kendaraan">Kendaraan</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonLabel position="stacked" style={{ paddingTop: '10px' }}>Type</IonLabel>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton
                                expand="full"
                                color={selectedType === 'income' ? 'success' : 'medium'}
                                onClick={() => setSelectedType('income')}
                            >
                                Income
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton
                                expand="full"
                                color={selectedType === 'expenses' ? 'danger' : 'medium'}
                                onClick={() => setSelectedType('expenses')}
                            >
                                Expenses
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonItem>
                    <IonLabel position="stacked">Transaction Date</IonLabel>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" className="ion-text-center">
                                <IonDatetime
                                    value={transactionDate}
                                    onIonChange={(e) => setTransactionDate(Array.isArray(e.detail.value) ? e.detail.value[0] : e.detail.value!)}
                                    display-format="DD/MM/YYYY"
                                ></IonDatetime>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>

                <IonButton expand="full" onClick={handleSaveTransaction}>Save Transaction</IonButton>
            </IonContent>
        </IonPage>
    );
};


export default Add;
