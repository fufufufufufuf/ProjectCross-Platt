import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonIcon, IonButton, IonAlert } from '@ionic/react';
import { ellipse, add, trash } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

interface Category {
    name: string;
    type: string;
}

interface ParentColor {
    [key: string]: string;
}

const Category: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const parentColor: ParentColor = {
        income: "success",
        expenses: "danger"
    };
    const history = useHistory();
    const [showAlert, setShowAlert] = useState<boolean>(false);

    useEffect(() => {
        const defaultCategories: Category[] = [
            { name: "Gaji", type: "income" },
            { name: "Investasi", type: "income" },
            { name: "Usaha", type: "income" },
            { name: "Makanan & Minuman", type: "expenses" },
            { name: "Pendidikan", type: "expenses" },
            { name: "Pajak", type: "expenses" },
            { name: "Kendaraan", type: "expenses" },
        ];

        const storedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        setCategories([...defaultCategories, ...storedCategories]);
    }, []);

    const handleDeleteCategory = (category: Category) => {
        if (category.type !== 'default') {
            setSelectedCategory(category);
            setShowAlert(true);
        }
    };

    const handleAddCategory = () => {
        history.push("/addcategory");
    };

    const handleConfirmDelete = () => {
        if (selectedCategory) {
            const updatedCategories = categories.filter(cat => cat.name !== selectedCategory.name);
            setCategories(updatedCategories);
            localStorage.setItem('categories', JSON.stringify(updatedCategories.filter(cat => cat.type !== 'default')));
            setSelectedCategory(null);
        }
        setShowAlert(false);
    };

    const handleCancelDelete = () => {
        setShowAlert(false);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="secondary">
                    <IonTitle color="primary">Category</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonButton color="tertiary" expand="full" onClick={handleAddCategory}>
                    <IonIcon color="light" slot="start" icon={add} />
                    <IonLabel color="light">Create New Category</IonLabel>
                </IonButton>
                <IonList>
                    <IonItem lines="none">
                        <IonLabel className="ion-text-center" color={parentColor.income}>Income</IonLabel>
                    </IonItem>
                    {categories.filter(cat => cat.type === 'income').map((category, index) => (
                        <IonItem key={index}>
                            <IonIcon slot="start" icon={ellipse} color={parentColor.income} />
                            <IonLabel color="primary">{category.name}</IonLabel>
                            <IonButton slot="end" fill="clear" color="danger" onClick={() => handleDeleteCategory(category)}>
                                <IonIcon icon={trash} />
                            </IonButton>
                        </IonItem>
                    ))}
                </IonList>
                <IonList>
                    <IonItem lines="none">
                        <IonLabel className="ion-text-center" color={parentColor.expenses}>Expenses</IonLabel>
                    </IonItem>
                    {categories.filter(cat => cat.type === 'expenses').map((category, index) => (
                        <IonItem key={index}>
                            <IonIcon slot="start" icon={ellipse} color={parentColor.expenses} />
                            <IonLabel color="primary">{category.name}</IonLabel>
                            <IonButton slot="end" fill="clear" color="danger" onClick={() => handleDeleteCategory(category)}>
                                <IonIcon icon={trash} />
                            </IonButton>
                        </IonItem>
                    ))}
                </IonList>
                <IonAlert 
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Confirm Delete'}
                    message={`Are you sure you want to delete category '${selectedCategory?.name}'?`}
                    buttons={[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: handleCancelDelete
                        },
                        {
                            text: 'Delete',
                            handler: handleConfirmDelete
                        }
                    ]}
                />
            </IonContent>
        </IonPage>
    );
};

export default Category;
