import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonGrid, IonRow, IonCol, IonDatetime, IonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';

interface Category {
    name: string;
    type: string;
}

const Add: React.FC = () => {
    const [amount, setAmount] = useState<number | undefined>();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [transactionDate, setTransactionDate] = useState<string>(new Date().toISOString());
    const [categories, setCategories] = useState<Category[]>([]);
    const [accountBalance, setAccountBalance] = useState<number>(0); 
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const history = useHistory();

    useEffect(() => {
        const storedCategories: Category[] = JSON.parse(localStorage.getItem('categories') || '[]');

        const uniqueCategories = storedCategories.filter((category, index, self) =>
            index === self.findIndex(c => c.name.trim().toLowerCase() === category.name.trim().toLowerCase()) &&
            category.name.trim() !== ''
        );

        setCategories(uniqueCategories);
    }, []);

    const handleCategoryChange = (categoryName: string) => {
        setSelectedCategory(categoryName);

        const category = categories.find(cat => cat.name.trim().toLowerCase() === categoryName.trim().toLowerCase());
        if (category) {
            setSelectedType(category.type);
        }
    };

    const handleSaveTransaction = () => {
        if (!amount || !selectedCategory || !selectedType || !transactionDate) {
            setAlertMessage('Please fill in all fields');
            setShowAlert(true);
            return;
        }
        const newBalance = selectedType === 'income' ? accountBalance + (amount || 0) : accountBalance - (amount || 0);

        setAccountBalance(newBalance);

        const transactionDetails = {
            amount: amount,
            category: selectedCategory,
            type: selectedType,
            date: transactionDate,
            balance: newBalance 
        };

        history.push({
            pathname: '/tabs/home',
            state: { transactionDetails: transactionDetails, accountBalance: newBalance }
        });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="secondary">
                    <IonTitle color="primary">Add Transaction</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel color="primary" position="floating">Amount</IonLabel>
                    <IonInput color="primary" type="number" value={amount} placeholder="Rp" onIonChange={e => setAmount(parseFloat(e.detail.value!))}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel color="primary" position="stacked">Category</IonLabel>
                    <IonSelect value={selectedCategory} placeholder="Select Category" onIonChange={e => handleCategoryChange(e.detail.value)}>
                        {categories.map((category, index) => (
                            <IonSelectOption key={index} value={category.name}>
                                {category.name}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel color="primary" position="stacked">Type</IonLabel>
                    <IonInput color={selectedType === 'income' ? 'success' : 'danger'} value={selectedType} readonly></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel color="primary" position="stacked">Transaction Date</IonLabel>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" className="ion-text-center">
                                <IonDatetime 
                                    color="medium"
                                    value={transactionDate}
                                    onIonChange={(e) => setTransactionDate(Array.isArray(e.detail.value) ? e.detail.value[0] : e.detail.value!)}
                                    display-format="DD/MM/YYYY"
                                ></IonDatetime>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonButton color="tertiary" expand="full" onClick={handleSaveTransaction}><IonLabel color="light">Save Transaction</IonLabel></IonButton>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Alert'}
                    message={alertMessage}
                    buttons={['OK']}
                />
            </IonContent>
        </IonPage>
    );
};

export default Add;
