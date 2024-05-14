import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const NewCate: React.FC = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryType, setCategoryType] = useState('');
    const history = useHistory();

    const handleSaveCategory = () => {
        const newCategory = { name: categoryName, type: categoryType };
        const existingCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        const updatedCategories = [...existingCategories, newCategory];
        localStorage.setItem('categories', JSON.stringify(updatedCategories));

        history.push("/tabs/category");
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>New Category</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem lines="full">
                    <IonLabel position="floating">Nama Kategori</IonLabel>
                    <IonInput value={categoryName} onIonChange={e => setCategoryName(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Tipe Kategori</IonLabel>
                </IonItem>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" color={categoryType === 'income' ? 'success' : 'medium'} onClick={() => setCategoryType('income')}>
                                Income
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton expand="block" color={categoryType === 'expenses' ? 'danger' : 'medium'} onClick={() => setCategoryType('expenses')}>
                                Expense
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonButton expand="full" onClick={handleSaveCategory}>Save</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default NewCate;
