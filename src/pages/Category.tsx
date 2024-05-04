import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonIcon, IonButton } from '@ionic/react';
import { ellipse, add } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

interface Category {
    name: string;
    type: string;
}

interface ParentColor {
    [key: string]: string;
}

const Category: React.FC = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const parentColor: ParentColor = {
        income: "success",
        expenses: "danger"
    };
    const history = useHistory();

    useEffect(() => {
        // Ambil kategori dari localStorage saat halaman dimuat
        const storedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        setCategories(storedCategories);
    }, []);

    const handleAddCategory = () => {
        history.push("/addcategory");
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Category</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonButton expand="full" onClick={handleAddCategory}>
                    <IonIcon slot="start" icon={add} />
                    Create New Category
                </IonButton>
                <IonList>
                    <IonItem lines="none">
                        <IonLabel className="ion-text-center" color={parentColor.income}>Income</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={ellipse} color={parentColor.income} />
                        <IonLabel>Gaji</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={ellipse} color={parentColor.income} />
                        <IonLabel>Investasi</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={ellipse} color={parentColor.income} />
                        <IonLabel>Usaha</IonLabel>
                    </IonItem>
                    {categories.map((category, index) => (
                    <IonList key={index}>
                        <IonItem key={index}>
                            <IonIcon slot="start" icon={ellipse} color={parentColor.income} />
                            <IonLabel>{category.name}</IonLabel>
                        </IonItem>
                    </IonList>
                ))}
                </IonList>
                <IonList>
                    <IonItem lines="none">
                        <IonLabel className="ion-text-center" color={parentColor.expenses}>Expenses</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={ellipse} color={parentColor.expenses} />
                        <IonLabel>Makanan & Minuman</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={ellipse} color={parentColor.expenses} />
                        <IonLabel>Pendidikan</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={ellipse} color={parentColor.expenses} />
                        <IonLabel>Pajak</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={ellipse} color={parentColor.expenses} />
                        <IonLabel>Kendaraan</IonLabel>
                    </IonItem>
                    {categories.map((category, index) => (
                    <IonList key={index}>
                        <IonItem key={index}>
                            <IonIcon slot="start" icon={ellipse} color={parentColor.expenses} />
                            <IonLabel>{category.name}</IonLabel>
                        </IonItem>
                    </IonList>
                ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Category;
