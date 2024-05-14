import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports: React.FC = () => {
    const data = [
        { name: 'January', income: 4000, expense: 2400, amt: 2400 },
        { name: 'February', income: 3000, expense: 1398, amt: 2210 },
        { name: 'March', income: 2000, expense: 9800, amt: 2290 },
        { name: 'April', income: 2780, expense: 3908, amt: 2000 },
        { name: 'May', income: 1890, expense: 4800, amt: 2181 },
        { name: 'June', income: 2390, expense: 3800, amt: 2500 },
        { name: 'July', income: 3490, expense: 4300, amt: 2100 },
    ];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="secondary">
                    <IonTitle color="primary">Reports</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <ResponsiveContainer color="primary" width="100%" height={400} style={{ paddingTop: '25px' }}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis  />
                        <Tooltip  />
                        <Legend />
                        <Bar  dataKey="income" fill="var(--ion-color-success)" />
                        <Bar dataKey="expense" fill="var(--ion-color-danger)" />
                    </BarChart>
                </ResponsiveContainer>
            </IonContent>
        </IonPage>
    );
};

export default Reports;
